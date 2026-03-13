import type { Response, NextFunction } from 'express';
import type { AuthRequest } from './authMiddleware.js';

export const roleMiddleware = (roles: Array<'PM' | 'DESIGNER' | 'DEVELOPER' | 'BOTH'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};
