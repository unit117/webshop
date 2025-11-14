import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { db } from '../config/db.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { menuItemSchema } from '../models/schemas.js';

const router = Router();

router.use(requireAdmin);

router.get('/orders', async (req, res) => {
  await db.read();
  res.json(db.data.orders);
});

router.post('/menu', async (req, res) => {
  const payload = { id: uuid(), ...req.body };
  menuItemSchema.parse(payload);
  await db.read();
  db.data.menuItems.push(payload);
  await db.write();
  res.status(201).json(payload);
});

router.put('/menu/:id', async (req, res) => {
  const { id } = req.params;
  await db.read();
  const item = db.data.menuItems.find((m) => m.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Menu item not found' });
  }
  const updated = { ...item, ...req.body };
  menuItemSchema.parse(updated);
  Object.assign(item, updated);
  await db.write();
  res.json(item);
});

export default router;
