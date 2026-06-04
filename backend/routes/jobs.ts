import { Router } from 'express';
import { scoreTitle, scoreLocation, scoreType, scoreSalary } from '../logic/utils.ts';
import type { Request, Response } from 'express';
import { pool } from '../src/db/connection.ts';

export const router = Router();

  router.get('/:id', async (req, res) => {
  try {
  const jobId = Number(req.params.id);

  const result = await pool.query(
    `
  SELECT *
  FROM jobs
  WHERE id=$1
  `,
  [jobId]
  );

  const job = result.rows[0];

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
    console.log(page);

    const type =
  typeof req.query.type === 'string'
    ? req.query.type.trim()
    : '';

    const location =
  typeof req.query.location === 'string'
    ? req.query.location.trim()
    : '';

  let query =
  `
  SELECT *
  FROM jobs
  `
  
  const conditions: string[] = [];
  const values: (string | number)[] = [];


  if (location) {
    conditions.push(`LOWER(location) = LOWER($${values.length +1})`);
    values.push(location);
  }

  if (type) {
    conditions.push(`LOWER(type) = LOWER($${values.length + 1})`);
    values.push(type);
  }

  if (!Number.isNaN(salary)) {
    conditions.push(`salary >= $${values.length + 1}`);
    values.push(salary);
  }

  const whereClause =
    conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';

  const limit = 10;
  const offset = (page - 1) * limit;

  const countResult = await pool.query(
    `SELECT COUNT(*)::int AS count FROM jobs${whereClause}`,
    values
  );
  const totalJobs = countResult.rows[0].count;
  const totalPages = Math.max(1, Math.ceil(totalJobs / limit));

  query += whereClause;
  query += ` LIMIT ${limit} OFFSET ${offset}`;


    const result = await pool.query(query, values);

    let filterJobs = result.rows;
    
    const title = req.query.title as string;
    const company = req.query.company as string;
   

    const weights = {
      title: 5,
      location: 3,
      type: 2,
      salary: 4
    };

    if (company) {
      filterJobs = filterJobs.filter((job) =>
      job.company.toLowerCase() === company.toLowerCase()
      );
    };


     const scoredJobs = filterJobs.map((job) => {
      const scoredTitle = scoreTitle(job.title, title) * weights.title;
      const scoredLocation = scoreLocation(job.location, location) * weights.location;
      const scoredType = scoreType(job.type, type) * weights.type;
      const scoredSalary = scoreSalary(job.salary, salary) * weights.salary;
      const score = 
      scoredTitle + 
      scoredLocation + 
      scoredType + 
      scoredSalary;
      return {...job, score};
    });

    const sortedJobs = scoredJobs.sort((a, b) => {

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