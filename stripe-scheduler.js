// ============================================================================
// STRIPE PAYMENT INTEGRATION FOR SCHEDULER  
// ============================================================================

const STRIPE_PUBLIC_KEY = "pk_test_51TKpQfLoT0JUyRg2FVoyMtuUZaD52l70DnqTTOSMYEnw7zRBQbpbzU0egRefWpWKFIUkoF35zo4ZAiJrRz8EatXx0018EZd2MS";
const PAYMENT_INTENT_ENDPOINT = "https://estimator-sqzv.onrender.com/api/create-payment-intent";

let stripe = null;
let elements = null;
let cardElement = null;
let clientSecret = null;
let cardholderEmail = "";
let cardholderName = "";

// Initialize Stripe
function initializeSchedulerStripe() {
  console.log("🔵 Initializing Stripe...");
  
  if (!window.Stripe) {
    console.warn("⚠️ Stripe.js not loaded yet, will retry...");
    setTimeout(initializeSchedulerStripe, 500);
    return;
  }
  
  try {
    stripe = window.Stripe(STRIPE_PUBLIC_KEY);
    const appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0B3C5D',
      },
    };
    elements = stripe.elements({ appearance });
    cardElement = elements.create('card');
    console.log("✅ Stripe initialized");
  } catch (error) {
    console.error("❌ Stripe init error:", error);
  }
}

// Mount card element to payment-element div
function mountCardElement() {
  if (!cardElement) {
    console.error("❌ Card element not created");
    return false;
  }

  const container = document.getElementById('payment-element');
  if (!container) {
    console.error("❌ Payment element container not found");
    return false;
  }

  try {
    cardElement.mount('#payment-element');
    console.log("✅ Card element mounted");
    return true;
  } catch (error) {
    console.error("❌ Mount error:", error);
    return false;
  }
}

// Initialize payment
async function initializeSchedulerPayment(amount, customerEmail, customerName) {
  console.log("🔵 Initializing payment for $" + amount);
  
  cardholderEmail = customerEmail;
  cardholderName = customerName;

  if (!stripe || !elements) {
    console.error("❌ Stripe not ready");
    return;
  }

  try {
    // Create payment intent
    console.log("📡 Creating payment intent...");
    const response = await fetch(PAYMENT_INTENT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: 'usd',
        metadata: { email: customerEmail, name: customerName },
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    clientSecret = data.clientSecret;
    console.log("✅ Payment intent created");

    // Mount card element
    mountCardElement();
    
  } catch (error) {
    console.error("❌ Payment init error:", error);
    const errorDiv = document.getElementById('payment-errors');
    if (errorDiv) {
      errorDiv.textContent = "Payment error: " + error.message;
      errorDiv.classList.remove('hidden');
    }
  }
}

// Handle payment submission
async function handleSchedulerPaymentSubmit() {
  console.log("🔵 Submitting payment...");
  
  if (!stripe || !cardElement || !clientSecret) {
    console.error("❌ Payment not ready");
    return { success: false, error: 'Payment not initialized' };
  }

  try {
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardholderName,
          email: cardholderEmail,
        },
      },
    });

    if (error) {
      console.error("❌ Payment error:", error);
      return { success: false, error: error.message };
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log("✅ Payment successful");
      return { success: true, paymentId: paymentIntent.id };
    }

    return { success: false, error: `Payment status: ${paymentIntent?.status}` };
  } catch (error) {
    console.error("❌ Payment submission error:", error);
    return { success: false, error: error.message };
  }
}

// Export to window
window.schedulerStripe = {
  initialize: initializeSchedulerStripe,
  initializePayment: initializeSchedulerPayment,
  handlePaymentSubmit: handleSchedulerPaymentSubmit,
  getCardInfo: () => ({ email: cardholderEmail, name: cardholderName }),
};

// Initialize Stripe when available
document.addEventListener('DOMContentLoaded', () => {
  console.log("📄 DOM loaded");
  initializeSchedulerStripe();
});

if (document.readyState !== 'loading') {
  console.log("📄 Document already ready");
  initializeSchedulerStripe();
}

