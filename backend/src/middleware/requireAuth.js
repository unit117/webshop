import { verifyToken } from '../services/auth.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.split(' ')[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
