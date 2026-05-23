import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    isGuest?: boolean;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Gracefully handle guest/anonymous generations
    req.user = { id: 'guest_user', isGuest: true };
    return next();
  }

  try {
    const secret = process.env.JWT_SECRET || 'nextgen_projector_secret_jwt_key_2026_dev';
    const decoded = jwt.verify(token, secret) as { id: string; isGuest?: boolean };
    req.user = decoded;
    next();
  } catch (error) {
    // If token is invalid, don't crash, just log and return 403 or fall back to guest
    return res.status(403).json({ message: 'Session expired. Please log in again.' });
  }
};
