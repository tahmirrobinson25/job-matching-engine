import "dotenv/config";

import { PrismaClient} from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { normalizeDatabaseUrl } from './database.js';

const adapter = new PrismaPg({
    connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL),
});

export const prisma = new PrismaClient({
  adapter,
});
