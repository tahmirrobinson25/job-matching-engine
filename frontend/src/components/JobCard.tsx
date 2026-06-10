import type { Job, SearchState } from '../types';
import { Link } from 'react-router';

type JobCardProps = {
  job: Job;
  searchState: SearchState;
};

function formatSalary(value: number) {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export const JobCard = ({ job, searchState }: JobCardProps) => {
  const scoreLabel =
    typeof job.score === 'number' && !Number.isNaN(job.score)
      ? job.score.toFixed(1)
      : '—';

  return (
    <article className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-violet-300/80 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-violet-500/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 text-left">
          <h3 className="text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
            {job.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-violet-700 dark:text-violet-300">
            {job.company}
          </p>
        </div>
        <div
          className="shrink-0 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold tabular-nums text-violet-800 ring-1 ring-inset ring-violet-600/10 dark:bg-violet-950/80 dark:text-violet-200 dark:ring-violet-400/20"
          title="Match score"
        >
          Score {scoreLabel}
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-left text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Location
          </dt>
          <dd className="mt-0.5 text-zinc-800 dark:text-zinc-200">
            {job.location || '—'}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Type
          </dt>
          <dd className="mt-0.5 text-zinc-800 dark:text-zinc-200">
            {job.type || '—'}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Salary
          </dt>
          <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">
            {formatSalary(job.salary)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <Link
        to={`/jobs/${job.id}`}
        state={searchState}
        className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:outline-violet-400"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};
