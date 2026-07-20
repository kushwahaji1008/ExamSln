import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { genAttempts } from '@/services/api/generated';

export default function MyAttempts() {
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    genAttempts
      .getMyAttempts()
      .then(setAttempts)
      .catch(() => setAttempts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Attempts</h1>
        <p className="mt-2 text-sm text-slate-500">Review your recent exam attempts and continue unfinished sessions.</p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-500">Loading your attempts...</div>
      ) : attempts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-slate-500">
          No attempts found. Start an exam to create your first attempt.
        </div>
      ) : (
        <div className="grid gap-4">
          {attempts.map((attempt) => (
            <div key={attempt.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Attempt ID</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{attempt.id}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="text-base font-semibold text-slate-700">{attempt.status ?? 'Unknown'}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Exam</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{attempt.exam?.title ?? attempt.examTitle ?? 'Unknown exam'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Started</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{attempt.startedAt ? new Date(attempt.startedAt).toLocaleString() : 'N/A'}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/attempts/${attempt.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  View attempt
                </Link>
                {attempt.status !== 'submitted' && attempt.status !== 'completed' && (
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                    Continue attempt
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
