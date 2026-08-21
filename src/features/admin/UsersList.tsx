import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { genAuth } from '@/services/api/generated';
import PageHeader from '@/components/ui/PageHeader';

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    genAuth.listUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="Users" subtitle="Manage user accounts and navigate quickly to edit profiles or roles." />

      {loading ? (
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
          No users found yet.
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {users.map((user) => (
            <div key={user.id} className="rounded-[2rem] border border-slate-200 bg-card p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-indigo-100/40">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{user.fullName || user.email || 'Unnamed user'}</h2>
                  <p className="mt-2 text-sm text-slate-500">{user.email}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {user.role ?? 'Unknown'}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
                <span className="rounded-2xl bg-slate-100 px-3 py-2">ID: {user.id}</span>
                <span className="rounded-2xl bg-slate-100 px-3 py-2">Created: {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="mt-6">
                <Link className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-indigo-500" to={`/admin/users/${user.id}`}>
                  Edit user
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
