import { useState, type FormEvent } from 'react';
import { API_URL } from '../config/api';
import { useAuth } from '../context/useAuth';

export const UserProfilePage = () => {
  const { currentUser, updateCurrentUser, logout } = useAuth();
  const [firstName, setFirstName] = useState(currentUser?.firstName ?? '');
  const [lastName, setLastName] = useState(currentUser?.lastName ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  if (!currentUser) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); setMessage(''); setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ firstName, lastName, email, currentPassword, newPassword }),
      });
      if (response.status === 401) { logout(); return; }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to update your profile');
      updateCurrentUser(data);
      setCurrentPassword(''); setNewPassword(''); setMessage('Profile updated.');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to update your profile'); }
    finally { setSaving(false); }
  };

  return <main className="mx-auto max-w-xl p-8">
    <h1 className="text-3xl font-bold">Your profile</h1>
    <p className="mt-2 text-zinc-600">Update your account and sign-in information.</p>
    {error && <p className="mt-4 text-red-600">{error}</p>}
    {message && <p className="mt-4 text-green-700">{message}</p>}
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label>First name (optional)<input maxLength={50} value={firstName} onChange={(event) => setFirstName(event.target.value)} className="mt-1 block w-full rounded border p-2" /></label>
        <label>Last name (optional)<input maxLength={50} value={lastName} onChange={(event) => setLastName(event.target.value)} className="mt-1 block w-full rounded border p-2" /></label>
      </div>
      <label className="block">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 block w-full rounded border p-2" /></label>
      <div className="border-t pt-4"><p className="text-sm text-zinc-600">Enter your current password only when changing email or password.</p>
        <label className="mt-3 block">Current password<input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-1 block w-full rounded border p-2" autoComplete="current-password" /></label>
        <label className="mt-3 block">New password<input type="password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-1 block w-full rounded border p-2" autoComplete="new-password" /></label>
      </div>
      <button disabled={saving} className="rounded bg-violet-600 px-4 py-2 font-medium text-white disabled:opacity-50">{saving ? 'Saving...' : 'Save changes'}</button>
    </form>
  </main>;
};
