// ============================================================================
// STRIPE PAYMENT BACKEND - Node.js/Express
// ============================================================================
// This server handles creating Stripe Payment Intents for the Cost Estimator
// Deploy this to production with your Stripe keys
//
// INSTALLATION:
// 1. npm init -y
// 2. npm install express stripe dotenv cors body-parser
// 3. Create .env file with STRIPE_SECRET_KEY and PORT
// 4. npm start
//
// ENVIRONMENT VARIABLES NEEDED:
// STRIPE_SECRET_KEY=sk_live_your_key_here (or sk_test_ for testing)
// PORT=3001 (or your preferred port)
// CORS_ORIGIN=https://yourdomainname.com (the estimator domain)

const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Stripe setup - make sure environment variable is set
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("ERROR: STRIPE_SECRET_KEY environment variable not set");
  process.exit(1);
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Create Payment Intent endpoint
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd", description, metadata } = req.body;

    // Validate request
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (amount > 99999900) {  // Stripe limit: $999,999 USD
      return res.status(400).json({ error: "Amount exceeds maximum allowed" });
    }

    // Validate metadata
    if (!metadata || !metadata.customerEmail) {
      return res.status(400).json({ error: "Customer email is required in metadata" });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),  // Amount in cents
      currency: currency.toLowerCase(),
      description: description || "Tamay Enterprises - Cost Estimator",
      metadata: {
        projectType: metadata.projectType || "unknown",
        customerEmail: metadata.customerEmail,
        customerPhone: metadata.customerPhone,
        customerName: metadata.customerName,
        timestamp: new Date().toISOString(),
      },
      // Optional: Add statement descriptor suffix (appears on customer's credit card statement)
      statement_descriptor_suffix: "TAMAY ESTIMATES",
      // Optional: Automatic tax calculation if connected
      // automatic_tax: { enabled: true },
    });

    // Return client secret for frontend
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      error: error.message || "Failed to create payment intent",
      type: error.type
    });
  }
});

// Webhook endpoint for Stripe events (optional but recommended)
// This allows you to verify payments server-side
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    if (!endpointSecret) {
      console.warn("Webhook signature verification skipped - STRIPE_WEBHOOK_SECRET not set");
      event = JSON.parse(req.body);
    } else {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.sendStatus(400);
  }

  // Handle different event types
  switch (event.type) {
    case "payment_intent.succeeded":
      handlePaymentIntentSucceeded(event.data.object);
      break;
    case "payment_intent.payment_failed":
      handlePaymentIntentFailed(event.data.object);
      break;
    case "charge.refunded":
      handleChargeRefunded(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Payment event handlers
function handlePaymentIntentSucceeded(paymentIntent) {
  console.log("Payment succeeded:", paymentIntent.id);
  // Send confirmation email or update database
  // Example:
  // await sendEmail('payment_confirmation', {
  //   email: paymentIntent.metadata.customerEmail,
  //   amount: paymentIntent.amount,
  //   projectType: paymentIntent.metadata.projectType
  // });
}

function handlePaymentIntentFailed(paymentIntent) {
  console.log("Payment failed:", paymentIntent.id);
  // Send failure notification or log for review
}

function handleChargeRefunded(charge) {
  console.log("Charge refunded:", charge.id);
  // Log refund for accounting
}

// Test payment method endpoint (for testing)
app.post("/api/test-payment", (req, res) => {
  res.json({
    testCards: {
      success: "4242 4242 4242 4242",
      requiresAuth: "4000 0027 6000 3184",
      declined: "4000 0000 0000 0002",
      amexSuccess: "3782 822463 10005",
      expired: "4000 0000 0000 0069",
    },
    expiryDate: "12/25",
    cvv: "any 3-4 digits"
  });
});

// List recent payment intents (for admin/testing)
app.get("/api/recent-payments", (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Not available in production" });
  }

  stripe.paymentIntents.list({ limit: 10 })
    .then(intents => {
      res.json({
        count: intents.data.length,
        payments: intents.data.map(pi => ({
          id: pi.id,
          amount: pi.amount,
          currency: pi.currency,
          status: pi.status,
          created: new Date(pi.created * 1000).toISOString(),
          clientEmail: pi.metadata?.customerEmail,
        }))
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message
  });
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Cost Estimator Payment Server running on port ${PORT}`);
  console.log(`🔐 Using Stripe ${process.env.NODE_ENV === "production" ? "LIVE" : "TEST"} mode`);
  console.log(`📝 CORS enabled for: ${process.env.CORS_ORIGIN || "http://localhost:3000"}`);
});

module.exports = app;
