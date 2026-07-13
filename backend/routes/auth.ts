import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../src/lib/prisma.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const authRouter = Router();

authRouter.get('/', (req, res) => {
  res.json({
    message: 'Auth router is working',
  });
});

authRouter.post('/register', async (req, res) => {
  const email =
    typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password =
    typeof req.body.password === 'string' ? req.body.password : '';

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters',
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Server error',
    });
  }
});

authRouter.post('/login', async (req, res) => {
  const email =
    typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password =
    typeof req.body.password === 'string' ? req.body.password : '';

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not configured');
    return res.status(500).json({
      error: 'Server configuration error',
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Server error',
    });
  }
});

authRouter.get('/me', authMiddleware, async (req, res) => {
  const userId = req.userId;

  if (userId === undefined) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Server error',
    });
  }
});
