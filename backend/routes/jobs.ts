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
    //const location = (req.query.location as string).trim();
    //const type = (req.query.type as string).trim();
    const salary = Number(req.query.salary);

    const type =
  typeof req.query.type === 'string'
    ? req.query.type.trim()
    : '';

    const location =
  typeof req.query.location === 'string'
    ? req.query.location.trim()
    : '';

    console.log({
  location,
  type,
  salary
  });

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

  if (conditions.length > 0) {
    query +=` WHERE ${conditions.join(' AND ')} `;
  }

  console.log(query);
  console.log(values);

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

    //const filteredJobs = scoredJobs.filter(job => job.score > 0);

    const sortedJobs = scoredJobs.sort((a, b) => {

      return b.score - a.score;

      
    }); 

    


    res.json(sortedJobs);
});