import { JobCard } from './JobCard';
import type { Job } from '../types';

type JobListProps = {
  jobs: Job[];
  hasLoadedOnce: boolean;
};

export const JobList = ({ jobs, hasLoadedOnce, }: JobListProps) => {
  if (jobs.length === 0 && !hasLoadedOnce) {
    return (
      <div
        className="rounded-xl border border-zinc-200 bg-white px-6 py-14 text-center dark:border-zinc-800 dark:bg-zinc-900/40"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading jobs…</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          No jobs match these filters yet.
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Try broadening title or location, or confirm the API is running on{' '}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            localhost:3000
          </code>
          .
        </p>
      </div>
    );
  }

  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job}/>
        </li>
      ))}
    </ul>
  );
};
