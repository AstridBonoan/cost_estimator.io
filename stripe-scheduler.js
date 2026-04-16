// ============================================================================
// STRIPE PAYMENT INTEGRATION FOR SCHEDULER
// ============================================================================
// This file handles payment processing on the scheduler page
// Requires: Stripe Public Key set below

const STRIPE_PUBLIC_KEY = "pk_live_51TKpQfLoT0JUyRg2FVoyMtuUZaD52l70DnqTTOSMYEnw7zRBQbpbzU0egRefWpWKFIUkoF35zo4ZAiJrRz8EatXx0018EZd2MS";
const PAYMENT_INTENT_ENDPOINT = "http://localhost:3001/api/create-payment-intent";

let stripe;
let elements;
let paymentElement;
let clientSecret = null;
let cardholderEmail = null;
let cardholderName = null;
let isPaymentReady = false;

// Initialize Stripe on page load
function initializeSchedulerStripe() {
  console.log("Initializing Stripe...");
  
  if (!STRIPE_PUBLIC_KEY || STRIPE_PUBLIC_KEY === "pk_test_YOUR_KEY_HERE") {
    console.warn("⚠️  Stripe Public Key not configured");
    return;
  }

  stripe = Stripe(STRIPE_PUBLIC_KEY);
  console.log("Stripe initialized");
  createPaymentElements();
}

// Create Stripe Elements
function createPaymentElements() {
  if (!stripe) {
    console.error("Stripe not initialized");
    return;
  }

  console.log("Creating payment elements...");

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0B3C5D',
      colorBackground: '#FFFFFF',
      colorText: '#2F2F2F',
      colorDanger: '#fa755a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
      fontSizeBase: '16px',
    },
  };

  elements = stripe.elements({ appearance });
  
  // Create the Payment Element
  paymentElement = elements.create('payment');
  console.log("Elements created, Payment Element created");
}

// Mount Payment Element
function mountSchedulerPaymentElement() {
  if (!paymentElement) {
    console.error("Payment element not initialized");
    return;
  }

  const paymentElementContainer = document.getElementById("payment-element");
  if (!paymentElementContainer) {
    console.error("Payment element container not found");
    return;
  }

  // Clear any existing content
  paymentElementContainer.innerHTML = '';

  try {
    paymentElement.mount("#payment-element");
    isPaymentReady = true;
    console.log("Payment element mounted successfully");
  } catch (error) {
    console.error("Error mounting payment element:", error);
    showSchedulerPaymentError("Failed to load payment form. Please refresh the page.");
  }
}

// Create Payment Intent
async function createSchedulerPaymentIntent(amount, customerEmail, customerName) {
  try {
    console.log("Creating payment intent for $" + amount);
    
    const response = await fetch(PAYMENT_INTENT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        description: "Tamay Enterprises Booking",
        metadata: {
          customerEmail,
          customerName,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Payment intent created:", data.clientSecret);
    return data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    showSchedulerPaymentError(`Failed to initialize payment: ${error.message}`);
    return null;
  }
}

// Show payment message
function showSchedulerPaymentMessage(message, type = "success") {
  const paymentMessage = document.getElementById("payment-message");
  if (paymentMessage) {
    paymentMessage.textContent = message;
    paymentMessage.classList.remove("hidden", "error", "processing");
    paymentMessage.classList.add(type);
  }
}

// Show payment error
function showSchedulerPaymentError(error) {
  console.error("Payment error:", error);
  const paymentErrors = document.getElementById("payment-errors");
  if (paymentErrors) {
    paymentErrors.textContent = error;
    paymentErrors.classList.remove("hidden");
  }
}

// Clear payment errors
function clearSchedulerPaymentErrors() {
  const paymentErrors = document.getElementById("payment-errors");
  if (paymentErrors) {
    paymentErrors.textContent = "";
    paymentErrors.classList.add("hidden");
  }
}

// Initialize payment for the booking amount
async function initializeSchedulerPayment(amount, customerEmail, customerName) {
  console.log("Initializing payment for:", { amount, customerEmail, customerName });

  if (!stripe) {
    console.error("Stripe not initialized");
    showSchedulerPaymentError("Stripe is not initialized. Please refresh the page.");
    return;
  }

  if (!elements) {
    console.error("Elements not created");
    showSchedulerPaymentError("Payment system not ready. Please refresh the page.");
    return;
  }

  cardholderEmail = customerEmail;
  cardholderName = customerName;

  // Create payment intent
  const intentData = await createSchedulerPaymentIntent(amount, customerEmail, customerName);
  if (!intentData || !intentData.clientSecret) {
    showSchedulerPaymentError("Failed to initialize payment. Please try again.");
    return;
  }

  clientSecret = intentData.clientSecret;

  // Update payment element with billing details
  try {
    const { error } = await elements.update({
      defaultValues: {
        billingDetails: {
          name: customerName,
          email: customerEmail,
        },
      },
    });

    if (error) {
      showSchedulerPaymentError(`Payment setup error: ${error.message}`);
      return;
    }
  } catch (error) {
    console.error("Error updating elements:", error);
  }

  // Mount the payment element
  mountSchedulerPaymentElement();
  console.log("Payment initialized successfully");
}

// Handle payment submission
async function handleSchedulerPaymentSubmit() {
  if (!stripe || !elements) {
    showSchedulerPaymentError("Payment system not initialized");
    return { success: false, error: "Payment system not initialized" };
  }

  if (!isPaymentReady) {
    showSchedulerPaymentError("Payment form is not ready. Please wait a moment.");
    return { success: false, error: "Payment form not ready" };
  }

  clearSchedulerPaymentErrors();
  showSchedulerPaymentMessage("Processing your payment...", "processing");

  try {
    console.log("Confirming payment with clientSecret:", clientSecret);

    // Confirm payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (error) {
      console.error("Stripe error:", error);
      showSchedulerPaymentError(error.message);
      return { success: false, error: error.message };
    }

    // Payment successful
    if (paymentIntent && paymentIntent.status === "succeeded") {
      showSchedulerPaymentMessage("✓ Payment successful! Processing your booking...", "success");
      console.log("Payment succeeded:", paymentIntent.id);
      return { success: true, paymentId: paymentIntent.id };
    } else {
      const status = paymentIntent?.status || "unknown";
      showSchedulerPaymentError(`Payment status: ${status}`);
      return { success: false, error: `Payment status: ${status}` };
    }
  } catch (error) {
    console.error("Payment error:", error);
    showSchedulerPaymentError(`Payment failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Export for global use
window.schedulerStripe = {
  initialize: initializeSchedulerStripe,
  initializePayment: initializeSchedulerPayment,
  handlePaymentSubmit: handleSchedulerPaymentSubmit,
  getCardInfo: () => ({ email: cardholderEmail, name: cardholderName }),
};

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initializeSchedulerStripe);
} else {
  initializeSchedulerStripe();
}

