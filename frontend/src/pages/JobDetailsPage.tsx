import { Link, useParams, useLocation} from 'react-router-dom';
import type { Job, SearchState } from '../types';
import {useEffect, useState} from 'react';
import {  } from 'react-router-dom';

export const JobDetailPage = () => {
    const { id } = useParams();
    const [job,setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const searchState = location.state as SearchState | undefined;

    const handleApply = () => {
        alert("Apply feature not available. Check back soon!");
    }

    const handleSave = () => {
        alert("Save feature not available. Check back soon!");
    }

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:3000/jobs/${id}`);
                if (!response.ok) {
                    throw new Error('Job not found');
                }

                const data : Job = await response.json();

                setJob(data);

            }
            catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id])

        if (loading) {
            return <p className="p-6">Loading...</p>
        }

        if (!job) {
            return <p className="">Job not found.</p>
        }

        return (
            <div className="mx-auto max-w-4xl p-6">
                <Link to="/" 
                state={searchState}
                className="mb-6 inline-flex items-center rounded-lg border px-4 py-2 text-violet-600 hover:bg-violet-50"
                >
                Back to Search
                </Link>
                
                <div className="rounded-xl border p-6 shadow-sm">

                    <div className="text-center">
                        <h1 className="text-3xl font-bold">
                            {job.title}
                        </h1>

                        <p className="mt-2 text-lg font-bold">
                            {job.company}
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-8">

                        <div>
                            <p>
                                <strong>Location:</strong> {job.location}
                            </p>

                            <p className="mt-4">
                                <strong>Type:</strong> {job.type}
                            </p>

                            <p className="mt-4">
                                <strong>Salary:</strong> $
                                {job.salary.toLocaleString()}
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">

                            <button
                                className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-violet-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 active:scale-[0.98] dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus-visible:outline-violet-400"
                                onClick={handleApply}
                            >
                                Apply Now
                            </button>

                            <button
                                className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-violet-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 active:scale-[0.98] dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus-visible:outline-violet-400"
                                onClick={handleSave}
                            >
                                Save Job
                            </button>

                        </div>

                    </div>

                </div>
                <div className="mt-6 flex justify-center">
                    <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                        Match Score: {job.score ?? "N/A"}
                    </span>
                </div>

                <div className="mt-8 rounded-xl border p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Description: </h2>
                    <p className="mt-2 whitespace-pre-line leading-7">{job.description}</p>
                </div>

                <div className="mt-8 mx-auto rounded-xl border p-6 shadow-sm ">
                    <h2 className="text-xl font-semibold">Skills: </h2>
                {job.skills && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold ">
                        Skills
                        </h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700"
                            >
                                {skill}
                            </span>
                        ))}
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
};