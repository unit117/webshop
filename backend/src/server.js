import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { db } from './config/db.js';
import menuRoutes from './routes/menu.js';
import locationRoutes from './routes/locations.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
await db.read();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/menu', menuRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error', detail: err.message });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
