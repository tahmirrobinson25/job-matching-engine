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
  const firstName =
    typeof req.body.firstName === 'string' ? req.body.firstName.trim() || null : null;
  const lastName =
    typeof req.body.lastName === 'string' ? req.body.lastName.trim() || null : null;
  const email =
    typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password =
    typeof req.body.password === 'string' ? req.body.password : '';

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
    });
  }

  if ((firstName?.length ?? 0) > 50 || (lastName?.length ?? 0) > 50) {
    return res.status(400).json({ error: 'Names must be 50 characters or fewer' });
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
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
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
        firstName: true,
        lastName: true,
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

authRouter.patch('/me', authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (userId === undefined) return res.status(401).json({ error: 'Unauthorized' });

  const firstName = typeof req.body.firstName === 'string' ? req.body.firstName.trim() || null : null;
  const lastName = typeof req.body.lastName === 'string' ? req.body.lastName.trim() || null : null;
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const currentPassword = typeof req.body.currentPassword === 'string' ? req.body.currentPassword : '';
  const newPassword = typeof req.body.newPassword === 'string' ? req.body.newPassword : '';

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if ((firstName?.length ?? 0) > 50 || (lastName?.length ?? 0) > 50) {
    return res.status(400).json({ error: 'Names must be 50 characters or fewer' });
  }
  if (newPassword && newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const changingCredentials = email !== user.email || Boolean(newPassword);
    if (changingCredentials && !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(400).json({ error: 'Your current password is required to change email or password' });
    }

    if (email !== user.email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) return res.status(400).json({ error: 'That email address is already in use' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        ...(newPassword ? { password: await bcrypt.hash(newPassword, 10) } : {}),
      },
      select: { id: true, firstName: true, lastName: true, email: true, createdAt: true },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
