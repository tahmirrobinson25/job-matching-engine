import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

type AuthTokenPayload = jwt.JwtPayload & {
  userId: number;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No token provided',
    });
  }

  const token = authHeader.slice('Bearer '.length).trim();

  if (!token) {
    return res.status(401).json({
      error: 'Invalid token format',
    });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('JWT_SECRET is not configured');
    return res.status(500).json({
      error: 'Server configuration error',
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;

    if (decoded.userId === undefined) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }
};
