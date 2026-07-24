import { useState, useEffect } from "react";
import { API_URL } from "../config/api";
import type { Job } from "../types";
import { JobCard } from "../components/JobCard";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const MyJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/jobs/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          logout();
          navigate('/login', { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to load your jobs");
        }

        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load your jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [logout, navigate]);

  const handleDelete = async (jobId: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URL}/jobs/${jobId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      logout();
      navigate('/login', { replace: true });
      return;
    }

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    setJobs((currentJobs) =>
      currentJobs.filter((job) => job.id !== jobId)
    );

  } catch (err) {
    console.error(err);
    alert("Unable to delete job.");
  }
};

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (jobs.length === 0) {
    return (
    <div className="mx-auto max-w-6xl p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Jobs</h1>
          <button onClick={() => navigate('/jobs/new')} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">Create job</button>
        </div>

        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">
            You haven't created any jobs yet.
          </h2>

          <p className="text-gray-600">
            Create your first job posting to see it here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">My Jobs</h1>
        <button onClick={() => navigate('/jobs/new')} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">Create job</button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
            <JobCard
            key={job.id}
            job={job}
            >
            <button
                onClick={() => navigate(`/jobs/${job.id}/edit`)}
                className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
                Edit
            </button>

            <button
                onClick={() => handleDelete(job.id)}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
                Delete
            </button>
            </JobCard>
        ))}
        </div>
    </div>
  );
};
