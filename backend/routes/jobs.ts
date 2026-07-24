import { Router } from 'express';
import { scoreTitle, scoreLocation, scoreType, scoreSalary } from '../logic/utils.js';
import type { Request, Response } from 'express';
import { Prisma } from '../src/generated/prisma/client.js';
import { prisma } from '../src/lib/prisma.js';
import type { Job } from '../src/generated/prisma/client.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const router = Router();

type JobInput = {
  title: string;
  company: string;
  location: string | null;
  type: string;
  salary: number | null;
  description: string | null;
};

function parseJobInput(body: unknown): JobInput | null {
  if (!body || typeof body !== 'object') return null;
  const value = body as Record<string, unknown>;
  const requiredText = (key: 'title' | 'company' | 'type') =>
    typeof value[key] === 'string' ? value[key].trim() : '';
  const optionalText = (key: 'location' | 'description') => {
    if (value[key] == null || value[key] === '') return null;
    return typeof value[key] === 'string' ? value[key].trim() || null : null;
  };
  const title = requiredText('title');
  const company = requiredText('company');
  const type = requiredText('type');
  const rawSalary = value.salary;
  const salary = rawSalary == null || rawSalary === '' ? null : Number(rawSalary);

  if (!title || !company || !type || (salary !== null && (!Number.isInteger(salary) || salary < 0))) {
    return null;
  }

  return { title, company, type, location: optionalText('location'), description: optionalText('description'), salary };
}

async function findOwnedJob(id: number, userId: number) {
  return prisma.job.findFirst({ where: { id, ownerId: userId } });
}

router.get('/mine', authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (userId === undefined) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const jobs = await prisma.job.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: 'desc' },
    });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const input = parseJobInput(req.body);
  if (!input) return res.status(400).json({ error: 'A title, company, type, and valid non-negative salary are required.' });
  const userId = req.userId;
  if (userId === undefined) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const job = await prisma.job.create({ data: { ...input, ownerId: userId } });
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const salaryParam = req.query.salary;
    const salary = typeof salaryParam === 'string' && salaryParam.trim() !== '' ? Number(salaryParam) : NaN;
    const page = Math.max(1, Number(req.query.page) || 1);
    const type = typeof req.query.type === 'string' ? req.query.type.trim() : '';
    const location = typeof req.query.location === 'string' ? req.query.location.trim() : '';
    const title = typeof req.query.title === 'string' ? req.query.title : '';
    const company = typeof req.query.company === 'string' ? req.query.company : '';
    const where: Prisma.JobWhereInput = { isPublic: true };

    if (title) where.title = { contains: title, mode: 'insensitive' };
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (type) where.type = { equals: type, mode: 'insensitive' };
    if (!Number.isNaN(salary)) where.salary = { gte: salary };
    if (company) where.company = { equals: company, mode: 'insensitive' };

    const limit = 10;
    const totalJobs = await prisma.job.count({ where });
    const filterJobs = await prisma.job.findMany({ where, skip: (page - 1) * limit, take: limit });
    const weights = { title: 5, location: 3, type: 2, salary: 4 };
    const scoredJobs = filterJobs.map((job: Job) => ({
      ...job,
      score: scoreTitle(job.title, title) * weights.title + scoreLocation(job.location ?? '', location) * weights.location + scoreType(job.type, type) * weights.type + scoreSalary(job.salary ?? 0, salary) * weights.salary,
    })).sort((a, b) => b.score - a.score);

    res.json({ jobs: scoredJobs, totalPages: Math.max(1, Math.ceil(totalJobs / limit)), totalJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid job id' });
  try {
    const job = await prisma.job.findFirst({ where: { id, isPublic: true } });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const input = parseJobInput(req.body);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid job id' });
  if (!input) return res.status(400).json({ error: 'A title, company, type, and valid non-negative salary are required.' });
  const userId = req.userId;
  if (userId === undefined) return res.status(401).json({ error: 'Unauthorized' });
  try {
    if (!(await findOwnedJob(id, userId))) return res.status(404).json({ error: 'Job not found' });
    const job = await prisma.job.update({ where: { id }, data: input });
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid job id' });
  const userId = req.userId;
  if (userId === undefined) return res.status(401).json({ error: 'Unauthorized' });
  try {
    if (!(await findOwnedJob(id, userId))) return res.status(404).json({ error: 'Job not found' });
    await prisma.job.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
