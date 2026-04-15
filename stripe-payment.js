// ============================================================================
// STRIPE PAYMENT INTEGRATION
// ============================================================================
// This file handles all payment processing with Stripe
// Requires: STRIPE_PUBLIC_KEY environment variable or set below

// IMPORTANT: Set your Stripe Public Key below  
// Get it from: https://dashboard.stripe.com/apikeys
const STRIPE_PUBLIC_KEY = "pk_live_51TKpQfLoT0JUyRg2FVoyMtuUZaD52l70DnqTTOSMYEnw7zRBQbpbzU0egRefWpWKFIUkoF35zo4ZAiJrRz8EatXx0018EZd2MS";

// Backend URL for creating Payment Intents
// Set this to your backend endpoint that creates payment intents
const PAYMENT_INTENT_ENDPOINT = "/api/create-payment-intent";

let stripe;
let elements;
let paymentElement;
let clientSecret = null;

// Initialize Stripe on page load
function initializeStripe() {
  if (!STRIPE_PUBLIC_KEY || STRIPE_PUBLIC_KEY === "pk_test_YOUR_KEY_HERE") {
    console.warn("⚠️  Stripe Public Key not configured. Payment will not work until configured.");
    return;
  }

  stripe = Stripe(STRIPE_PUBLIC_KEY);
  createElements();
}

// Create Stripe Elements
function createElements() {
  if (!stripe) return;

  const appearance = {
    theme: 'light',
    variables: {
      colorPrimary: '#0B3C5D',
      colorBackground: '#FFFFFF',
      colorText: '#2F2F2F',
      colorDanger: '#fa755a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  elements = stripe.elements({ appearance });
  paymentElement = elements.create('payment');
}

// Mount Payment Element to the DOM
function mountPaymentElement() {
  if (!paymentElement) {
    console.error("Payment element not initialized");
    return;
  }

  const paymentElementContainer = document.getElementById("payment-element");
  if (paymentElementContainer && !paymentElementContainer.hasChildNodes()) {
    paymentElement.mount("#payment-element");
  }
}

// Create Payment Intent on backend
async function createPaymentIntent(amount, formData) {
  try {
    const response = await fetch(PAYMENT_INTENT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        description: `Tamay Enterprises - ${formData.projectDisplayName}`,
        metadata: {
          projectType: formData.projectType,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerName: formData.fullName,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    showPaymentError(`Failed to initialize payment: ${error.message}`);
    return null;
  }
}

// Show payment message
function showPaymentMessage(message, type = "success") {
  const paymentMessage = document.getElementById("payment-message");
  if (paymentMessage) {
    paymentMessage.textContent = message;
    paymentMessage.classList.remove("hidden", "error", "processing");
    paymentMessage.classList.add(type);
  }
}

// Show payment error
function showPaymentError(error) {
  const paymentErrors = document.getElementById("payment-errors");
  if (paymentErrors) {
    paymentErrors.textContent = error;
    paymentErrors.classList.remove("hidden");
  }
}

// Clear payment errors
function clearPaymentErrors() {
  const paymentErrors = document.getElementById("payment-errors");
  if (paymentErrors) {
    paymentErrors.textContent = "";
    paymentErrors.classList.add("hidden");
  }
}

// Handle payment submission
async function handlePaymentSubmit(e) {
  e.preventDefault();

  if (!stripe || !elements) {
    showPaymentError("Payment system not initialized");
    return;
  }

  const submitPaymentBtn = document.getElementById("submitPaymentBtn");
  const submitButtonState = document.getElementById("submitButtonState");

  clearPaymentErrors();
  submitPaymentBtn.disabled = true;
  submitButtonState.textContent = "Processing...";
  showPaymentMessage("Processing your payment...", "processing");

  try {
    // Confirm payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      },
      redirect: "if_required",
    });

    if (error) {
      showPaymentError(error.message);
      submitPaymentBtn.disabled = false;
      submitButtonState.textContent = "Complete Payment";
    } else {
      // Payment successful
      showPaymentMessage("Payment successful! Processing your request...", "success");
      await submitFormWithPayment("payment");
    }
  } catch (error) {
    console.error("Payment error:", error);
    showPaymentError(`Payment failed: ${error.message}`);
    submitPaymentBtn.disabled = false;
    submitButtonState.textContent = "Complete Payment";
  }
}

// Initialize Payment Flow
async function initializePayment(amount, formData) {
  if (!stripe) {
    showPaymentError("Stripe is not initialized. Please refresh the page.");
    return;
  }

  // Create payment intent on backend
  const intentData = await createPaymentIntent(amount, formData);
  if (!intentData || !intentData.clientSecret) {
    showPaymentError("Failed to initialize payment. Please try again.");
    return;
  }

  clientSecret = intentData.clientSecret;

  // Update payment element with the new intent
  const { error } = await elements.update({
    defaultValues: {
      billingDetails: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: {
          postal_code: formData.zipcode,
        },
      },
    },
  });

  if (error) {
    showPaymentError(`Payment setup error: ${error.message}`);
    return;
  }

  // Mount the payment element
  mountPaymentElement();

  // Show payment section
  const paymentSection = document.getElementById("paymentSection");
  const submitPaymentBtn = document.getElementById("submitPaymentBtn");
  if (paymentSection) {
    paymentSection.classList.remove("hidden");
    if (submitPaymentBtn) {
      submitPaymentBtn.disabled = false;
    }
  }
}

// Cancel payment flow
function cancelPaymentFlow() {
  const paymentSection = document.getElementById("paymentSection");
  if (paymentSection) {
    paymentSection.classList.add("hidden");
  }
  clearPaymentErrors();
  clientSecret = null;
}

// Export functions for use in app.js
window.stripePayment = {
  initialize: initializeStripe,
  initializePayment,
  handlePaymentSubmit,
  cancelPaymentFlow,
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", initializeStripe);
