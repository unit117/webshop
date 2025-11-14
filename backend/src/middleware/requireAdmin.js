import { verifyToken } from '../services/auth.js';
import { db } from '../config/db.js';

export async function requireAdmin(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.split(' ')[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = verifyToken(token);
    await db.read();
    const user = db.data.users.find((u) => u.id === decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
