import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import type { Server } from 'node:http';
import { router } from './routes/jobs.js';
import { authRouter } from './routes/auth.js';
import { prisma } from './src/lib/prisma.js';
import {
  databaseConnectRetries,
  databaseRetryDelay,
  isRetryableDatabaseError,
  sleep,
} from './src/lib/database.js';

const app = express();
const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,https://job-matching-engine-five.vercel.app')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json());
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

app.get('/ping', (_req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('/health/ready', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ready' });
  } catch (error) {
    console.error('Database readiness check failed:', error);
    res.status(503).json({ status: 'unavailable', error: 'Database is unavailable' });
  }
});

app.use('/jobs', router);
app.use('/auth', authRouter);

const PORT = Number(process.env.PORT) || 3000;

let server: Server | undefined;

function startServer(): Server {
  const httpServer = app.listen(PORT);

  httpServer.on('listening', () => {
    console.log(`Server running on port ${PORT}`);
  });

  httpServer.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `Port ${PORT} is already in use. Stop the other process or set a different PORT in .env`
      );
    } else {
      console.error('Failed to start server:', err);
    }
    process.exit(1);
  });

  return httpServer;
}

async function shutdown(signal: string) {
  console.log(`\nReceived ${signal}. Shutting down...`);

  if (server) {
    await new Promise<void>((resolve, reject) => {
      server!.close((err) => (err ? reject(err) : resolve()));
    });
  }

  await prisma.$disconnect();
  process.exit(0);
}

async function main() {
  if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET is not set. Auth login will fail until it is configured.');
  }

  const retries = databaseConnectRetries();
  for (let attempt = 0; ; attempt += 1) {
    try {
      await prisma.$connect();
      break;
    } catch (error) {
      if (!isRetryableDatabaseError(error) || attempt >= retries) throw error;
      const delay = databaseRetryDelay(attempt);
      console.warn(`Database connection failed; retrying in ${delay}ms (${attempt + 1}/${retries}).`);
      await sleep(delay);
    }
  }
  server = startServer();

  process.on('SIGINT', () => {
    void shutdown('SIGINT');
  });
  process.on('SIGTERM', () => {
    void shutdown('SIGTERM');
  });
}

main().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
