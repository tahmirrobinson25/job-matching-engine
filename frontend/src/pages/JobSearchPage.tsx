import { useEffect, useState } from 'react';
import type { Job, Filters, SearchState } from '../types';
import { SearchForm } from '../components/SearchForm';
import { JobList } from '../components/JobList';
import { useLocation } from 'react-router-dom';

type JobsApiResponse =
    | Job[]
    | { jobs?: Job[]; totalPages?: number; totalJobs?: number };

function parseJobsResponse(data: JobsApiResponse, page: number, pageSize = 10) {
    if (Array.isArray(data)) {
        const jobs = data;
        const isLastPage = jobs.length < pageSize;
        return {
            jobs,
            totalJobs: isLastPage
                ? (page - 1) * pageSize + jobs.length
                : page * pageSize + 1,
            totalPages: isLastPage ? page : page + 1,
        };
    }

    const jobs = data.jobs ?? [];
    const totalJobs = data.totalJobs ?? jobs.length;
    const totalPages = Math.max(1, data.totalPages ?? 1);

    return { jobs, totalJobs, totalPages };
}

export const JobSearchPage = () => {
    const location = useLocation();
    const previousState = location.state as SearchState | undefined;

    const [jobs, setJobs] = useState<Job[]>([]);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const [filters, setFilters] = useState<Filters>( 
        previousState?.filters ?? {
        title: '',
        location: '',
        type: '',
        salary: '',
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');

    const [page, setPage] = useState(
        previousState?.page ?? 1
    );

    const [totalPages, setTotalPages] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);

    

    const fetchJobs = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
            `http://localhost:3000/jobs?title=${encodeURIComponent(filters.title)}&location=${encodeURIComponent(filters.location)}&type=${encodeURIComponent(filters.type)}&salary=${encodeURIComponent(filters.salary)}&page=${page}&company=`
            );

            if (!response.ok) {
            throw new Error('Failed to fetch jobs');
            }

            const data: JobsApiResponse = await response.json();
            const parsed = parseJobsResponse(data, page);

            setJobs(parsed.jobs);
            setTotalPages(parsed.totalPages);
            setTotalJobs(parsed.totalJobs);
        } catch (err) {
            console.error(err);
            setError('Error loading jobs');
            setJobs([]);
            setTotalPages(1);
            setTotalJobs(0);
        } finally {
            setLoading(false);
            setHasLoadedOnce(true);
        }
        };

    useEffect(() => {
    fetchJobs();
    }, [page]); 

    const handleSubmit = async () => {
  setPage(1);

  if (page === 1) {
    fetchJobs();
  }
};

const handlePageChange = (newPage: number) => {
  setPage(newPage);
};

const hasResults = totalJobs > 0;
const showEmptyState = hasLoadedOnce && !loading && jobs.length === 0;

const searchState = {
    filters,
    page,
}

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
                        !hasLoadedOnce || loading
                        ? 'Loading...' 
                        : error
                        ? 'Unable to load results'
                        : !hasResults
                        ? 'No listings found'
                        : `${totalJobs} job${totalJobs === 1 ? '' : 's'}`
                    }
                    </p>
                </div>

                {error && (
                    <p className="mb-4 text-red-500">
                        {error}
                    </p>
                )}

                <JobList
                    jobs={jobs}
                    hasLoadedOnce={hasLoadedOnce}
                    loading={loading}
                    error={error}
                    showEmptyState={showEmptyState}
                    searchState={searchState}
                />

                {hasLoadedOnce && !loading && hasResults && (
                <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <button
                className={`mt-4 inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-violet-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 active:scale-[0.98] dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus-visible:outline-violet-400 sm:mt-0 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''} `}
                id="previous-btn"
                disabled={page === 1}
                onClick={() => {
                    if (page > 1) {
                        handlePageChange(page -1);
                    }
                }}
                >Previous</button>
                <span><strong>Page {page} of {totalPages}</strong></span>
                <button
                className={`mt-4 inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-violet-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 active:scale-[0.98] dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus-visible:outline-violet-400 sm:mt-0 ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                id="next-btn"
                disabled={page >= totalPages}
                onClick={() => {
                    if (page < totalPages) {
                        handlePageChange(page + 1);
                    }
                }}
                >Next</button>
                </div>
                )}
            </section>


        </div>
    )
};
