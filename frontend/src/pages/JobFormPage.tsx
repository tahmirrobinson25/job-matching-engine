import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config/api';
import { JOB_TYPES, LOCATIONS } from '../constants/jobOptions';
import { useAuth } from '../context/useAuth';

type JobForm = { title: string; company: string; location: string; type: string; salary: string; description: string };
const blankForm: JobForm = { title: '', company: '', location: '', type: '', salary: '', description: '' };
const fieldClass = 'mt-1 block w-full rounded border p-2';
const normalizeLocation = (location: unknown) => {
  if (typeof location !== 'string') return '';
  if (LOCATIONS.some(([value]) => value === location)) return location;
  const stateCode = location.match(/,\s*([A-Z]{2})$/)?.[1];
  return LOCATIONS.some(([value]) => value === stateCode) ? stateCode : '';
};

export const JobFormPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [form, setForm] = useState<JobForm>(blankForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const update = (field: keyof JobForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/jobs/mine`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        if (response.status === 401) { logout(); navigate('/login', { replace: true }); return null; }
        if (!response.ok) throw new Error('Unable to load job');
        return response.json();
      })
      .then((jobs) => {
        if (!jobs) return;
        const job = jobs.find((candidate: { id: number }) => candidate.id === Number(id));
        if (!job) throw new Error('Job not found');
        setForm({ title: job.title ?? '', company: job.company ?? '', location: normalizeLocation(job.location), type: job.type ?? '', salary: job.salary?.toString() ?? '', description: job.description ?? '' });
      })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, [id, logout, navigate]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true); setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/jobs${isEditing ? `/${id}` : ''}`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, location: form.location || null, salary: form.salary === '' ? null : Number(form.salary) }),
      });
      if (response.status === 401) { logout(); navigate('/login', { replace: true }); return; }
      if (!response.ok) { const data = await response.json(); throw new Error(data.error || 'Unable to save job'); }
      navigate('/jobs/mine');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save job'); }
    finally { setSaving(false); }
  };

  if (loading) return <p className="p-8">Loading...</p>;
  return <main className="mx-auto max-w-2xl p-8">
    <Link to="/jobs/mine" className="text-violet-600 hover:underline">Back to My Jobs</Link>
    <h1 className="mt-4 text-3xl font-bold">{isEditing ? 'Edit job' : 'Create job'}</h1>
    {error && <p className="mt-4 text-red-600">{error}</p>}
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label>Title<input required value={form.title} onChange={(event) => update('title', event.target.value)} className={fieldClass} /></label>
        <label>Company<input required value={form.company} onChange={(event) => update('company', event.target.value)} className={fieldClass} /></label>
        <label>Location<select value={form.location} onChange={(event) => update('location', event.target.value)} className={fieldClass}><option value="">Select a location</option>{LOCATIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label>Job type<select required value={form.type} onChange={(event) => update('type', event.target.value)} className={fieldClass}><option value="">Select a job type</option>{JOB_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
        <label>Salary<input type="number" min="0" value={form.salary} onChange={(event) => update('salary', event.target.value)} className={fieldClass} /></label>
      </div>
      <label className="block">Description<textarea value={form.description} onChange={(event) => update('description', event.target.value)} className={`${fieldClass} min-h-32`} /></label>
      <button disabled={saving} className="rounded bg-violet-600 px-4 py-2 font-medium text-white disabled:opacity-50">{saving ? 'Saving...' : 'Save job'}</button>
    </form>
  </main>;
};
