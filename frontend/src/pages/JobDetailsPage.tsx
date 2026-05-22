import { Link, useParams } from 'react-router-dom';
import type { Job } from '../types';
import {useEffect, useState} from 'react';

export const JobDetailPage = () => {
    const { id } = useParams();
    console.log('ID FROM URL:', id);
    const [job,setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

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
                <Link to="/" className="text-violet-600 underline">
                Back to Search
                </Link>
                <h1 className="mt-4 text-3xl font-bold">{job.title}</h1>
                <p className="mt-2 text-lg">{job.company}</p>

                <div>
                    <p className=""><strong>Location:</strong>{job.location}</p>
                    <p className=""><strong>Type: </strong>{job.type}</p>
                    <p className=""><strong>Salary: </strong>${job.salary.toLocaleString()}</p>
                    <p className=""><strong>Score: </strong>{job.score ?? 'N/A'}</p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Description: </h2>
                    <p className="mt-2 whitespace-pre-line">{job.description}</p>
                </div>

                {job.skills && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold ">
                        Skills
                        </h2>
                        <ul>
                            {job.skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                
                )}
            </div>
        );
};