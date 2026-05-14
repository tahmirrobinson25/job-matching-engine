import { useEffect, useState } from 'react';
import type { Job } from './types';
import { SearchForm } from './components/SearchForm';
import { JobList } from './components/JobList';

type Filters = {
  title: string;
  location: string;
  type: string;
  salary: string;
};

const App = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    title: '',
    location: '',
    type: '',
    salary: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/jobs');
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setHasLoadedOnce(true);
      }
    };

    fetchJobs();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/jobs?title=${encodeURIComponent(filters.title)}&location=${encodeURIComponent(filters.location)}&type=${encodeURIComponent(filters.type)}&salary=${encodeURIComponent(filters.salary)}`
      );

      const data: Job[] = await response.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setHasLoadedOnce(true);
    }
  };

  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <header className="mb-10 text-center sm:mb-12">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Ranked opportunities
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Job Matching Engine
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-zinc-600 dark:text-zinc-400">
          Filter roles and compare match scores to focus applications where you fit best.
        </p>
      </header>

      <SearchForm
        filters={filters}
        setFilters={setFilters}
        handleSubmit={handleSubmit}
      />

      <section className="mt-10" aria-labelledby="results-heading">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="results-heading"
            className="text-lg font-medium text-zinc-900 dark:text-zinc-100"
          >
            Results
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {!hasLoadedOnce
              ? 'Loading…'
              : jobs.length === 0
                ? 'No listings yet'
                : `${jobs.length} job${jobs.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <JobList jobs={jobs} hasLoadedOnce={hasLoadedOnce} />
      </section>
    </div>
  );
}

export default App;
