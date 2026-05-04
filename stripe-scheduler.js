// ============================================================================
// STRIPE PAYMENT INTEGRATION FOR SCHEDULER (optional / legacy helper)
// ============================================================================
// scheduler.html uses stripe-payment.js. This file stays in sync so any
// future include does not use a hardcoded publishable key.

const STRIPE_API_BASE = "https://estimator-sqzv.onrender.com";
const PAYMENT_INTENT_ENDPOINT = `${STRIPE_API_BASE}/api/create-payment-intent`;
const PUBLIC_CONFIG_ENDPOINT = `${STRIPE_API_BASE}/api/public-config`;

let STRIPE_PUBLIC_KEY = null;
let stripe = null;
let elements = null;
let cardElement = null;
let clientSecret = null;
let cardholderEmail = "";
let cardholderName = "";

async function loadStripePublicKey() {
  const response = await fetch(PUBLIC_CONFIG_ENDPOINT, { method: "GET" });
  if (!response.ok) throw new Error(`public-config ${response.status}`);
  const data = await response.json();
  if (!data?.stripePublicKey) throw new Error("missing stripePublicKey");
  return String(data.stripePublicKey).trim();
}

// Initialize Stripe
async function initializeSchedulerStripe() {
  console.log("🔵 Initializing Stripe...");

  if (!window.Stripe) {
    console.warn("⚠️ Stripe.js not loaded yet, will retry...");
    setTimeout(initializeSchedulerStripe, 500);
    return;
  }

  try {
    if (!STRIPE_PUBLIC_KEY) {
      STRIPE_PUBLIC_KEY = await loadStripePublicKey();
    }
    stripe = window.Stripe(STRIPE_PUBLIC_KEY);
    const appearance = {
      theme: "stripe",
      variables: {
        colorPrimary: "#0B3C5D",
      },
    };
    elements = stripe.elements({ appearance });
    cardElement = elements.create("card");
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

  const container = document.getElementById("payment-element");
  if (!container) {
    console.error("❌ Payment element container not found");
    return false;
  }

  try {
    cardElement.mount("#payment-element");
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
    console.log("📡 Creating payment intent...");
    const response = await fetch(PAYMENT_INTENT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: "usd",
        metadata: {
          customerEmail: customerEmail,
          customerName: customerName || "unknown",
          projectType: "scheduler",
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    clientSecret = data.clientSecret;
    console.log("✅ Payment intent created");

    mountCardElement();
  } catch (error) {
    console.error("❌ Payment init error:", error);
    const errorDiv = document.getElementById("payment-errors");
    if (errorDiv) {
      errorDiv.textContent = "Payment error: " + error.message;
      errorDiv.classList.remove("hidden");
    }
  }
}

// Handle payment submission
async function handleSchedulerPaymentSubmit() {
  console.log("🔵 Submitting payment...");

  if (!stripe || !cardElement || !clientSecret) {
    console.error("❌ Payment not ready");
    return { success: false, error: "Payment not initialized" };
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

    if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("✅ Payment successful");
      return { success: true, paymentId: paymentIntent.id };
    }

    return { success: false, error: `Payment status: ${paymentIntent?.status}` };
  } catch (error) {
    console.error("❌ Payment submission error:", error);
    return { success: false, error: error.message };
  }
}

window.schedulerStripe = {
  initialize: initializeSchedulerStripe,
  initializePayment: initializeSchedulerPayment,
  handlePaymentSubmit: handleSchedulerPaymentSubmit,
  getCardInfo: () => ({ email: cardholderEmail, name: cardholderName }),
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 DOM loaded");
  initializeSchedulerStripe();
});

if (document.readyState !== "loading") {
  console.log("📄 Document already ready");
  initializeSchedulerStripe();
}
