# 💳 Stripe Payment Integration for Cost Estimator

## What's Been Added

Your Cost Estimator now includes seamless Stripe payment integration. After customers fill out the form and see their estimate, they can immediately pay a deposit to move forward with scheduling.

## Key Features

✅ **Dynamic Payment Amounts** - Payment automatically matches the calculated estimate  
✅ **Stripe Payment Element** - Modern, secure payment form  
✅ **Real-time Validation** - Instantly validate card and calculation  
✅ **Mobile Responsive** - Works perfectly on phones and tablets  
✅ **Payment Tracking** - All payment data sent to Formspree for management  
✅ **Error Handling** - Clear error messages and retry options  

## Files Added/Modified

### New Files
- `stripe-payment.js` - Frontend Stripe integration
- `stripe-payment.css` - Payment UI styling  
- `server.js` - Node.js backend for Payment Intents
- `package.json` - Backend dependencies
- `.env.example` - Environment configuration template
- `STRIPE_SETUP_GUIDE.md` - Complete setup instructions
- `PAYMENT_INTEGRATION_README.md` - This file

### Modified Files
- `index.html` - Added payment section and Stripe scripts
- `app.js` - Added payment button handlers and form submission
- `styles.css` - Updated button styling

## Quick Start (5 minutes)

### 1. Get Stripe Keys
1. Sign up at https://stripe.com (free account)
2. Go to https://dashboard.stripe.com/apikeys
3. Copy your **Publishable Key** and **Secret Key**

### 2. Update Frontend
Edit `stripe-payment.js`:
```javascript
const STRIPE_PUBLIC_KEY = "pk_live_YOUR_KEY_HERE";  // Line 7
const PAYMENT_INTENT_ENDPOINT = "https://your-backend.com/api/create-payment-intent";  // Line 10
```

### 3. Deploy Backend
- See `STRIPE_SETUP_GUIDE.md` for detailed deployment instructions
- Recommended: Heroku, Railway, or DigitalOcean

### 4. Test
Use test card: `4242 4242 4242 4242` with any future expiry date

## Payment Flow

```
Customer Fills Form
    ↓
Clicks "Pay Deposit & Schedule"
    ↓
Payment Element Appears
    ↓
Enters Card Details (Stripe handles security)
    ↓
Backend Creates Payment Intent
    ↓
Frontend Confirms Payment with Stripe
    ↓
Success! Payment sent to Formspree + scheduler notification
```

## What Customers See

1. **Three payment options on results screen:**
   - "Pay Deposit & Schedule" - Immediate payment
   - "Schedule Without Payment" - Schedule first, pay later
   - "Get My Exact Quote" - Request detailed quote
   
2. **Secure payment form** with:
   - Card number field
   - Expiry and CVC
   - Billing details auto-filled
   
3. **Instant confirmation** with:
   - Success message
   - Payment details
   - Next steps for scheduling

## Payment Data Flow

When payment is successful:

1. ✅ **Formspree receives:**
   - All form data (customer info, project details, estimate)
   - Payment status: "completed"
   - Amount paid
   - Payment method: "stripe"

2. ✅ **You receive email:** 
   - Standard Formspree notification
   - Includes "PAID LEAD" in subject
   - Full project and payment details

3. ✅ **Stripe Dashboard shows:**
   - Payment intent
   - Charge details
   - Customer metadata
   - Dispute/refund options

## Customization

### Change Deposit Amount
The payment uses the estimate's "working price" (average of min/max). To change:

**Option 1: Percentage of estimate**
Edit `stripe-payment.js` in `initializePayment()`:
```javascript
const depositAmount = Math.round(amount * 0.5);  // 50% deposit
```

**Option 2: Fixed deposit**
```javascript
const depositAmount = 500;  // $500 fixed deposit
```

### Add Processing Fee
Edit backend `server.js` to add Stripe fee:
```javascript
const stripeFee = Math.round(amount * 0.029 + 30);
const totalAmount = amount + stripeFee;
```

### Custom Success Page
Edit `index.html` payment completion screen (search for `paymentCompletionScreen`)

## Troubleshooting

**Payment button not showing?**
- Check browser console (F12) for errors
- Verify `STRIPE_PUBLIC_KEY` is set in `stripe-payment.js`
- Ensure backend is running and accessible

**Payment fails with network error?**
- Check backend is running: `curl http://localhost:3001/health`
- Verify CORS settings match your domain
- Check browser console network tab for details

**Payment amount is wrong?**
- Verify calculation in `app.js` `renderEstimate()` function
- Check that `latestEstimate` object has correct totalMin/totalMax
- Test with a specific estimate to verify

**Stripe not loading?**
- Check internet connection
- Verify Stripe script loaded: Open DevTools → Network tab
- Try incognito mode (disable extensions)

## Testing Checklist

- [ ] Form fills out completely
- [ ] Estimate calculates correctly
- [ ] "Pay Deposit" button appears
- [ ] Payment form loads (Stripe elements visible)
- [ ] Test card processes successfully
- [ ] Success message appears
- [ ] Email received in Formspree
- [ ] Payment shows in Stripe dashboard

## Security Notes

- ✅ **Stripe handles all card processing** - Your server never touches card data
- ✅ **Payment intents required** - Backend creates secure intent before payment
- ✅ **HTTPS required in production** - Never use HTTP for payments
- ✅ **API keys protected** - Secret key never exposed to frontend
- ✅ **Webhook verification** - Backend verifies Stripe events

## Support

For issues, check:
1. `STRIPE_SETUP_GUIDE.md` - Comprehensive setup guide
2. Browser console (F12) for JavaScript errors
3. Network tab to verify API calls
4. Stripe dashboard for payment details
5. Backend logs for server-side errors

## Next Steps

1. **Deploy backend** following `STRIPE_SETUP_GUIDE.md`
2. **Update Stripe keys** in `stripe-payment.js`
3. **Test with test cards** from Stripe
4. **Switch to live keys** when ready
5. **Monitor Stripe dashboard** for payments
6. **Set up webhooks** for production reliability

---

**Questions?** Check Stripe documentation: https://stripe.com/docs/payments/payment-element

Happy collecting deposits! 💰
