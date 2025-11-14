import { Router } from 'express';
import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';
import { db } from '../config/db.js';
import { paymentSchema } from '../models/schemas.js';

const router = Router();
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' }) : null;

router.post('/intent', async (req, res) => {
  const { amount, currency = 'usd', orderId } = req.body;
  if (!stripe) {
    return res.status(200).json({ clientSecret: `mock-${orderId}` });
  }
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true },
  });
  res.json({ clientSecret: intent.client_secret });
});

router.post('/record', async (req, res) => {
  const payment = {
    id: uuid(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  paymentSchema.parse(payment);
  await db.read();
  db.data.payments.push(payment);
  await db.write();
  res.status(201).json(payment);
});

export default router;
