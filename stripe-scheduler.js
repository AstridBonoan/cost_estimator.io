// ============================================================================
// STRIPE PAYMENT INTEGRATION FOR SCHEDULER
// ============================================================================

const STRIPE_PUBLIC_KEY = "pk_live_51TKpQfLoT0JUyRg2FVoyMtuUZaD52l70DnqTTOSMYEnw7zRBQbpbzU0egRefWpWKFIUkoF35zo4ZAiJrRz8EatXx0018EZd2MS";
const PAYMENT_INTENT_ENDPOINT = "http://localhost:3001/api/create-payment-intent";

let stripe = null;
let elements = null;
let paymentElement = null;
let clientSecret = null;
let cardholderEmail = "";
let cardholderName = "";

// Initialize Stripe on page load
function initializeSchedulerStripe() {
  console.log("🔵 Initializing Stripe...");
  
  if (!window.Stripe) {
    console.error("❌ Stripe.js library not loaded");
    return;
  }

  stripe = window.Stripe(STRIPE_PUBLIC_KEY);
  if (!stripe) {
    console.error("❌ Failed to create Stripe instance");
    return;
  }
  
  console.log("✅ Stripe instance created");

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0B3C5D',
      colorBackground: '#FFFFFF',
      colorText: '#2F2F2F',
      colorDanger: '#fa755a',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      borderRadius: '8px',
      fontSizeBase: '16px',
    },
  };

  elements = stripe.elements({ appearance });
  paymentElement = elements.create('payment');
  console.log("✅ Payment element created");
}

// Mount Payment Element
function mountSchedulerPaymentElement() {
  console.log("🔵 Mounting payment element...");
  
  if (!paymentElement) {
    console.error("❌ Payment element not created");
    return false;
  }

  const container = document.getElementById("payment-element");
  if (!container) {
    console.error("❌ Payment element container not found in DOM");
    return false;
  }

  try {
    container.innerHTML = '';
    paymentElement.mount("#payment-element");
    console.log("✅ Payment element mounted successfully");
    return true;
  } catch (error) {
    console.error("❌ Error mounting payment element:", error);
    return false;
  }
}

// Create Payment Intent
async function createSchedulerPaymentIntent(amount, customerEmail, customerName) {
  try {
    console.log("📡 Creating payment intent for $" + amount);
    
    const response = await fetch(PAYMENT_INTENT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: "usd",
        description: "Tamay Enterprises Booking",
        metadata: { customerEmail, customerName },
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Payment intent created");
    return data;
  } catch (error) {
    console.error("❌ Error creating payment intent:", error);
    return null;
  }
}

// Show/hide payment error
function showSchedulerPaymentError(message) {
  console.error("❌", message);
  const errorDiv = document.getElementById("payment-errors");
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
  }
}

function clearSchedulerPaymentErrors() {
  const errorDiv = document.getElementById("payment-errors");
  if (errorDiv) {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
  }
}

// Show payment message
function showSchedulerPaymentMessage(message, type = "success") {
  const msgDiv = document.getElementById("payment-message");
  if (msgDiv) {
    msgDiv.textContent = message;
    msgDiv.classList.remove("hidden");
    msgDiv.classList.add(type);
  }
}

// Initialize payment for the booking amount
async function initializeSchedulerPayment(amount, customerEmail, customerName) {
  console.log("🔵 Initializing payment:", { amount, customerEmail, customerName });

  if (!stripe || !elements) {
    console.error("❌ Stripe not ready");
    showSchedulerPaymentError("Stripe not initialized. Please refresh the page.");
    return;
  }

  // Store for later use
  cardholderEmail = customerEmail;
  cardholderName = customerName;

  // Create payment intent
  const intentData = await createSchedulerPaymentIntent(amount, customerEmail, customerName);
  if (!intentData || !intentData.clientSecret) {
    showSchedulerPaymentError("Failed to initialize payment. Please try again.");
    return;
  }

  clientSecret = intentData.clientSecret;

  // Update elements with billing details
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
      console.error("❌ Error updating elements:", error);
      showSchedulerPaymentError(`Payment setup error: ${error.message}`);
      return;
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }

  // Mount the payment element
  const mounted = mountSchedulerPaymentElement();
  if (mounted) {
    console.log("✅ Payment ready for $" + amount);
  }
}

// Handle payment submission
async function handleSchedulerPaymentSubmit() {
  console.log("🔵 Submitting payment...");
  
  if (!stripe || !elements) {
    showSchedulerPaymentError("Payment system not initialized");
    return { success: false, error: "Payment system not initialized" };
  }

  if (!clientSecret) {
    showSchedulerPaymentError("Payment not initialized. Please refresh.");
    return { success: false, error: "No client secret" };
  }

  clearSchedulerPaymentErrors();
  showSchedulerPaymentMessage("Processing your payment...", "processing");

  try {
    console.log("📡 Confirming payment...");
    
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (error) {
      console.error("❌ Stripe error:", error);
      showSchedulerPaymentError(error.message);
      return { success: false, error: error.message };
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("✅ Payment succeeded:", paymentIntent.id);
      showSchedulerPaymentMessage("✓ Payment successful! Processing your booking...", "success");
      return { success: true, paymentId: paymentIntent.id };
    } else {
      const status = paymentIntent?.status || "unknown";
      console.error("❌ Payment status:", status);
      showSchedulerPaymentError(`Payment status: ${status}`);
      return { success: false, error: `Payment status: ${status}` };
    }
  } catch (error) {
    console.error("❌ Payment error:", error);
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

