import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { db } from '../config/db.js';
import { orderSchema } from '../models/schemas.js';

const router = Router();

router.get('/', async (req, res) => {
  await db.read();
  const status = req.query.status;
  let orders = db.data.orders;
  if (status) {
    orders = orders.filter((order) => order.status === status);
  }
  res.json(orders);
});

router.post('/', async (req, res) => {
  const order = {
    id: uuid(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orderSchema.parse(order);
  await db.read();
  db.data.orders.push(order);
  await db.write();
  res.status(201).json(order);
});

router.patch('/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  await db.read();
  const order = db.data.orders.find((o) => o.id === orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  order.status = status;
  await db.write();
  res.json(order);
});

export default router;
