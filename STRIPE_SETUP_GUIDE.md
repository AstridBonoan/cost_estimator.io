# 🎯 Cost Estimator with Stripe Payment Integration - Setup Guide

## Overview
This Cost Estimator application now includes full Stripe payment integration. Customers can pay a deposit directly after receiving their estimate.

## Architecture
- **Frontend**: Static HTML/CSS/JS (deployed on GitHub Pages or any static host)
- **Backend**: Node.js/Express server (required for payment processing)
- **Payment**: Stripe Payment Element with dynamic amounts

## Quick Setup

### 1. Frontend Configuration

#### 1.1 Update Stripe Public Key
Edit `stripe-payment.js` and replace `STRIPE_PUBLIC_KEY`:

```javascript
const STRIPE_PUBLIC_KEY = "pk_live_YOUR_ACTUAL_PUBLIC_KEY_HERE";
```

Get your key from: https://dashboard.stripe.com/apikeys

#### 1.2 Update Payment Endpoint
Edit `stripe-payment.js` and update the backend URL:

```javascript
const PAYMENT_INTENT_ENDPOINT = "https://your-backend-domain.com/api/create-payment-intent";
```

### 2. Backend Setup (Stripe Payment Server)

#### 2.1 Prerequisites
- Node.js 14+ installed
- Stripe account (https://stripe.com)

#### 2.2 Installation

```bash
# Create backend folder
mkdir estimator-backend
cd estimator-backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express stripe dotenv cors body-parser

# Copy server.js to this directory
```

#### 2.3 Environment Configuration

Create `.env` file in backend folder:

```env
# Stripe Keys (from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_test_your_webhook_secret

# Server Config
PORT=3001
NODE_ENV=development

# CORS Configuration (your estimator domain)
CORS_ORIGIN=http://localhost:3000
```

#### 2.4 Start the Server

```bash
node server.js
```

Expected output:
```
🚀 Cost Estimator Payment Server running on port 3001
🔐 Using Stripe TEST mode
📝 CORS enabled for: http://localhost:3000
```

### 3. Production Deployment

#### 3.1 Update Environment for Production

```env
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
CORS_ORIGIN=https://estimator.tamayenterprises.com
```

#### 3.2 Deploy Backend

**Option A: Heroku (Free tier available)**
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set STRIPE_SECRET_KEY=sk_live_your_key
heroku config:set CORS_ORIGIN=https://your-domain.com

# Deploy
git push heroku main
```

**Option B: Railway.app (Recommended)**
- Push to GitHub
- Connect repo at railway.app
- Add environment variables in dashboard
- Auto-deploys on push

**Option C: AWS Lambda + API Gateway**
- Create Lambda function with server.js
- Set up API Gateway
- Configure CORS headers
- Deploy environment variables

**Option D: DigitalOcean App Platform**
- Connect GitHub repo
- Create from Dockerfile or package.json
- Set environment variables
- Auto-deploy on push

### 4. Testing Payment Flow

#### 4.1 Test Mode Setup
Use Stripe test keys (prefixed with `pk_test_` and `sk_test_`)

#### 4.2 Test Cards

| Card Number | Use Case | Status |
|---|---|---|
| 4242 4242 4242 4242 | Successful payment | Succeeds |
| 4000 0027 6000 3184 | 3D Secure required | Requires auth |
| 4000 0000 0000 0002 | Payment declined | Declined |
| 3782 822463 10005 | American Express | Succeeds |

**Expiry Date**: Any future date (e.g., 12/25)
**CVC**: Any 3-4 digits

#### 4.3 Test Complete Flow

1. Open estimator at `http://localhost:3000`
2. Fill out form and get estimate
3. Click "Pay Deposit & Schedule"
4. Use test card: `4242 4242 4242 4242`
5. Should see "Payment successful!" message

### 5. Stripe Dashboard Configuration

#### 5.1 Setup Webhook (Recommended for production)

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter: `https://your-backend.com/webhook`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy webhook signing secret to `.env` as `STRIPE_WEBHOOK_SECRET`

#### 5.2 Configure Customer Emails (Optional)

1. Go to: https://dashboard.stripe.com/settings/email
2. Customize payment receipt emails

### 6. Security Checklist

- [ ] Never commit `.env` file to git
- [ ] Use separate test and live keys for different environments
- [ ] Enable HTTPS on production website
- [ ] Configure CORS properly (not `*`)
- [ ] Set up webhook verification
- [ ] Monitor payment failures in Stripe dashboard
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Use environment variables for all sensitive data

### 7. Monitoring & Support

#### 7.1 View Payments in Dashboard
https://dashboard.stripe.com/payments

#### 7.2 Check Server Logs

**Heroku**: `heroku logs --tail`
**Railway**: View in dashboard
**DigitalOcean**: View in apps dashboard

#### 7.3 Troubleshooting

**Payment Element not showing**
- Check browser console for errors
- Verify `STRIPE_PUBLIC_KEY` is set correctly
- Check CORS settings in backend

**Payment failed**
- Check Stripe dashboard for detailed error
- Verify backend endpoint is reachable
- Check network tab in browser dev tools

**WebHook not triggering**
- Verify webhook URL is public and HTTPS
- Check Stripe webhook logs
- Restart backend server

### 8. Customization Options

#### 8.1 Change Deposit Amount

The payment amount automatically uses the calculated estimate (working price). To change this:

Edit `stripe-payment.js`:
```javascript
// Currently: uses working price from estimate
const workingPrice = Math.round((latestEstimate.totalMin + latestEstimate.totalMax) / 2);

// Option: Use minimum instead
const workingPrice = latestEstimate.totalMin;

// Option: Add percentage markup
const workingPrice = Math.round(latestEstimate.totalMin * 1.15);
```

#### 8.2 Add Payment Processing Fee

Update backend `server.js`:
```javascript
// Add 2.9% + $0.30 Stripe fee to amount
const processingFee = Math.round(amount * 0.029 + 30);
const totalAmount = amount + processingFee;

const paymentIntent = await stripeClient.paymentIntents.create({
  amount: totalAmount,
  // ... rest of config
});
```

#### 8.3 Customize Success/Error Messages

Edit `stripe-payment.js` in the `handlePaymentSubmit` function and payment message handlers.

### 9. API Reference

#### Create Payment Intent
**POST** `/api/create-payment-intent`

Request:
```json
{
  "amount": 15000,
  "currency": "usd",
  "description": "Drywall Patch Repair",
  "metadata": {
    "projectType": "drywall_patch_wall_repair",
    "customerEmail": "customer@example.com",
    "customerPhone": "555-1234",
    "customerName": "John Doe"
  }
}
```

Response (Success):
```json
{
  "clientSecret": "pi_xxxxx_secret_xxxxx",
  "paymentIntentId": "pi_xxxxx",
  "amount": 15000,
  "currency": "usd",
  "status": "requires_payment_method"
}
```

### 10. Support & Resources

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com
- **Tamay Enterprises**: [your contact info]

---

## FAQ

**Q: How much does Stripe charge?**
A: 2.9% + $0.30 per transaction for standard payments

**Q: Can customers save their payment method?**
A: Yes - use Stripe Link (built into Payment Element)

**Q: Do you support international cards?**
A: Yes - Stripe supports 135+ currencies and countries

**Q: What happens if a payment fails?**
A: Customer is notified and can retry. You receive webhook notification.

**Q: Can you refund payments?**
A: Yes - through Stripe Dashboard or API

---

Last updated: 2024
Made with ❤️ by Tamay Enterprises
