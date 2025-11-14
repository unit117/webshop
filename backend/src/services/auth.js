import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

export function createToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export async function findUserByEmail(email) {
  await db.read();
  return db.data.users.find((u) => u.email === email);
}

export async function createUser({ email, password, name, preferredLanguage = 'en', role = 'customer' }) {
  const hashed = await bcrypt.hash(password, 10);
  const user = {
    id: `usr-${Date.now()}`,
    email,
    password: hashed,
    name,
    preferredLanguage,
    role,
    passkeys: [],
  };
  await db.read();
  db.data.users.push(user);
  await db.write();
  return user;
}

export async function authenticate(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const matches = await bcrypt.compare(password, user.password);
  if (!matches) return null;
  return user;
}
