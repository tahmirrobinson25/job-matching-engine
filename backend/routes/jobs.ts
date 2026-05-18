import { Router } from 'express';
import { scoreTitle, scoreLocation, scoreType, scoreSalary } from '../logic/utils.ts';
import { jobs } from '../data/data.ts';
import type { Request, Response } from 'express';

export const router = Router();
 router.get('/',  (req :Request, res :Response) => {
    let filterJobs = jobs;

    const location = req.query.location as string;
    const title = req.query.title as string;
    const company = req.query.company as string;
    const type = req.query.type as string;
    const salary = Number(req.query.salary);

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
      const score = scoredTitle + scoredLocation + scoredType + scoredSalary;
      return {...job, score};
    });

    const filteredJobs = scoredJobs.filter(job => job.score > 0);

    const sortedJobs = filteredJobs.sort((a, b) => {

      return b.score - a.score;

      
    }); 

    


    res.json(sortedJobs);
});