import { JobCard } from './Jobcard';
import type { Job } from '../types';

type JobListProps = {
  jobs: Job[];
};

export const JobList = ({ jobs }: JobListProps) => {
  if (jobs.length === 0) {
    return <p>No jobs found.</p>;
  }

  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
};