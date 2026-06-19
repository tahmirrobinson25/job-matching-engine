import { Router } from 'express';
import { scoreTitle, scoreLocation, scoreType, scoreSalary } from '../logic/utils.ts';
import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../src/lib/prisma.ts';
import type { jobs as Job } from '@prisma/client'

export const router = Router();

  router.get('/:id', async (req, res) => {
  try {
  const jobId = Number(req.params.id);

  const job = await prisma.jobs.findUnique({
    where: {
      id: jobId
    }
  });

  if (!job) {
    return res.status(404).json({
      error: 'Job not found'
    });
  }

  res.json(job);
  }
  catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
  });

 router.get('/', async(req :Request, res :Response) => {
  try {
    const salaryParam = req.query.salary;
    const salary =
      typeof salaryParam === 'string' && salaryParam.trim() !== ''
        ? Number(salaryParam)
        : NaN;
    const page = Number(req.query.page) || 1;


    const type =
  typeof req.query.type === 'string'
    ? req.query.type.trim()
    : '';

    const location =
  typeof req.query.location === 'string'
    ? req.query.location.trim()
    : '';
    
  const title = req.query.title as string;

  const company = req.query.company as string;

  const where: Prisma.jobsWhereInput = {};

  if (title) {
    where.title = {
      contains: title,
      mode: 'insensitive'
    };
  }

  if (location) {
    where.location = {
      equals: location,
      mode: 'insensitive'
    };
  }

  if (type) {
    where.type = {
      equals: type,
      mode: 'insensitive'
    };
  }

  if (!Number.isNaN(salary)) {
    where.salary = {
      gte: salary
    };
  }

  if (company) {
    where.company = {
      equals: company,
      mode: 'insensitive'
    }
  }


  const limit = 10;
  const offset = (page - 1) * limit;

  const totalJobs = await prisma.jobs.count({
    where
  });

  
  const totalPages = Math.max(1, Math.ceil(totalJobs / limit));



    const filterJobs = await prisma.jobs.findMany({
      where,
      skip: offset,
      take: limit
    })
   

    const weights = {
      title: 5,
      location: 3,
      type: 2,
      salary: 4
    };

    type ScoredJob = Job & {
      score: number
    };

     const scoredJobs  :ScoredJob[] = filterJobs.map((job : Job) => {
      const scoredTitle = scoreTitle(job.title, title) * weights.title;
      const scoredLocation = scoreLocation(job.location ?? "", location) * weights.location;
      const scoredType = scoreType(job.type,type) * weights.type;
      const scoredSalary = scoreSalary(job.salary ?? 0, salary) * weights.salary;
      const score = 
      scoredTitle + 
      scoredLocation + 
      scoredType + 
      scoredSalary;
      return {...job, score};
    });

    const sortedJobs = scoredJobs.sort((a :ScoredJob, b :ScoredJob) => {

      return b.score - a.score;

      
    }); 

    

    res.json({
      jobs: sortedJobs,
      totalPages,
      totalJobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});