require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint 1: Create Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    // Validate amount >= 100 paise
    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Amount must be at least 100 paise.' });
    }

    const options = {
      amount, // amount in the smallest currency unit (paise)
      currency: currency || 'INR',
      receipt: receipt || `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
});

// Endpoint 2: Verify Payment
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required payment fields.' });
    }

    // Create the expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Signature matches - payment is verified
      // IMPORTANT: Here you would typically update your database to mark the order as Paid
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      // Signature mismatch
      res.status(400).json({ success: false, error: 'Invalid signature. Payment verification failed.' });
    }
  } catch (error) {
    console.error('Razorpay Verify Error:', error);
    res.status(500).json({ error: 'Verification error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
