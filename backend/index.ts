import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import type { Server } from 'node:http';
import { router } from './routes/jobs.ts';
import { authRouter } from './routes/auth.ts';
import { prisma } from './src/lib/prisma.ts';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
  res.json({ message: 'Server is running' });
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
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set in .env');
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET is not set. Auth login will fail until it is configured.');
  }

  await prisma.$connect();
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