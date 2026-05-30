import { useEffect, useState } from 'react';
import type { Job, Filters } from '../types';
import { SearchForm } from '../components/SearchForm';
import { JobList } from '../components/JobList';

export const JobSearchPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const [filters, setFilters] = useState<Filters>({
        title: '',
        location: '',
        type: '',
        salary: '',
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');

    const handleSubmit = async () => {

    setLoading(true);

    setError('');

    try {
      const response = await fetch(
        `http://localhost:3000/jobs?title=${encodeURIComponent(filters.title)}&location=${encodeURIComponent(filters.location)}&type=${encodeURIComponent(filters.type)}&salary=${encodeURIComponent(filters.salary)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data: Job[] = await response.json();
      setJobs(data);
    } catch (err) {
      console.error(err);

      setError("Error loading jobs");
    } finally {
      setLoading(false);
        
      setHasLoadedOnce(true);    
    }
  };

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);

            setError('');

            try {
                const response = await fetch('http://localhost:3000/jobs')

                if (!response.ok) {
                    throw new Error("Failed to fetch jobs.");
                }

                const data: Job[] = await response.json();

                setJobs(data);
            } catch (error) {
                console.error(error)

                setError("Error loading jobs.")
            } finally {
                
                setLoading(false);
                setHasLoadedOnce(true);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="mx-auto flex min-h-svh max-w-5xl flex-col px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            <header className="mb-10 text-center sm:mb-12">
                <h1 className="text-3xl font-semibold">
                Job Matching Engine
                </h1>
                <p className="mt-3 text-sm text-zinc-600">
                Filter roles and compare match scores.
                </p>
            </header>

            <SearchForm
            filters={filters}
            setFilters={setFilters}
            handleSubmit={handleSubmit}
            loading={loading}
            />

            <section className="mt-10">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-lg font-medium">
                    Results
                    </h2>
                    <p className="text-sm text-zinc-500">
                    {
                        !hasLoadedOnce 
                        ? 'Loading...' 
                        : jobs.length === 0
                        ? 'No listings found '
                        : `${jobs.length} job${jobs.length === 1 ? '' : 's'}`
                    }
                    </p>
                </div>

                {error && (
                    <p className="mb-4 text-red-500">
                        {error}
                    </p>
                )}

                {!loading && !error && jobs.length === 0 && hasLoadedOnce && (
                    <p className="text-zinc-500">
                        No jobs found matching your filters.
                    </p>
                )}

                {!loading && !error && (
                    <JobList jobs={jobs} hasLoadedOnce={hasLoadedOnce} />
                )}
                

            </section>
        </div>
    )
}