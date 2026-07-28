import { useEffect, useState } from 'react';
import { API_URL } from '../config/api';
import type { Job } from '../types';
import { JobCard } from '../components/JobCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

type DashboardTab = 'created' | 'saved';

export const MyJobsPage = () => {
  const [createdJobs, setCreatedJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<DashboardTab>('created');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const requestHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  const handleUnauthorized = () => { logout(); navigate('/login', { replace: true }); };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [createdResponse, savedResponse] = await Promise.all([
          fetch(`${API_URL}/jobs/mine`, { headers: requestHeaders() }),
          fetch(`${API_URL}/jobs/saved`, { headers: requestHeaders() }),
        ]);
        if (createdResponse.status === 401 || savedResponse.status === 401) return handleUnauthorized();
        if (!createdResponse.ok || !savedResponse.ok) throw new Error('Unable to load your dashboard');
        setCreatedJobs(await createdResponse.json());
        setSavedJobs(await savedResponse.json());
      } catch (reason) {
        console.error(reason);
        setError('Unable to load your jobs. Please try again.');
      } finally { setLoading(false); }
    };
    void fetchDashboard();
  }, [logout, navigate]);

  const removeSavedJob = async (jobId: number) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}/save`, { method: 'DELETE', headers: requestHeaders() });
      if (response.status === 401) return handleUnauthorized();
      if (!response.ok) throw new Error('Unable to remove saved job');
      setSavedJobs((jobs) => jobs.filter((job) => job.id !== jobId));
    } catch (reason) { console.error(reason); setError('Unable to remove the saved job.'); }
  };

  const deleteCreatedJob = async (jobId: number) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}`, { method: 'DELETE', headers: requestHeaders() });
      if (response.status === 401) return handleUnauthorized();
      if (!response.ok) throw new Error('Unable to delete job');
      setCreatedJobs((jobs) => jobs.filter((job) => job.id !== jobId));
      setSavedJobs((jobs) => jobs.filter((job) => job.id !== jobId));
    } catch (reason) { console.error(reason); setError('Unable to delete the job.'); }
  };

  const jobs = activeTab === 'created' ? createdJobs : savedJobs;
  const title = activeTab === 'created' ? 'Created jobs' : 'Saved jobs';

  if (loading) return <p className="p-8">Loading your dashboard...</p>;

  return <main className="mx-auto max-w-6xl p-8">
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="text-3xl font-bold">My Jobs</h1><p className="mt-1 text-zinc-600">Manage the jobs you post and save.</p></div>
      <button onClick={() => navigate('/jobs/new')} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">Create job</button>
    </div>
    <div className="mb-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Jobs created</p><p className="mt-1 text-3xl font-bold">{createdJobs.length}</p></div>
      <div className="rounded-xl border bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Jobs saved</p><p className="mt-1 text-3xl font-bold">{savedJobs.length}</p></div>
    </div>
    <div className="mb-6 flex gap-2 border-b">
      {(['created', 'saved'] as const).map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`border-b-2 px-4 py-3 text-sm font-medium ${activeTab === tab ? 'border-violet-600 text-violet-700' : 'border-transparent text-zinc-600 hover:text-zinc-900'}`}>{tab === 'created' ? `Created (${createdJobs.length})` : `Saved (${savedJobs.length})`}</button>)}
    </div>
    {error && <p className="mb-4 text-red-600">{error}</p>}
    {jobs.length === 0 ? <section className="rounded-lg border bg-white p-8 text-center shadow-sm"><h2 className="text-xl font-semibold">No {title.toLowerCase()} yet</h2><p className="mt-2 text-zinc-600">{activeTab === 'created' ? 'Create a job posting to see it here.' : 'Open a job and select Save Job to keep it here.'}</p></section> : <section><h2 className="mb-4 text-xl font-semibold">{title}</h2><div className="space-y-4">{jobs.map((job) => <JobCard key={job.id} job={job}>{activeTab === 'created' ? <><button onClick={() => navigate(`/jobs/${job.id}/edit`)} className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700">Edit</button><button onClick={() => void deleteCreatedJob(job.id)} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">Delete</button></> : <button onClick={() => void removeSavedJob(job.id)} className="rounded-lg bg-zinc-700 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">Remove saved</button>}</JobCard>)}</div></section>}
  </main>;
};
