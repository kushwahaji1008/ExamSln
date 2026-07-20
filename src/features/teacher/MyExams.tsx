import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { genExams } from '@/services/api/generated';
import PageHeader from '@/components/ui/PageHeader';

export default function MyExams() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    genExams.listExams().then(setExams).catch(() => setExams([]));
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="My Exams" subtitle="Create, review, and manage exam sessions with fast actions and clear status information." />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">You can edit or view each exam from the list below.</p>
        <Link className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500" to="/teacher/exams/create">
          + New Exam
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {exams.map((exam) => (
          <div key={exam.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-indigo-200/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{exam.title || 'Untitled Exam'}</h2>
                <p className="mt-2 text-sm text-slate-500">{exam.description || 'A quick overview of your exam configuration.'}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                {exam.status ? exam.status : 'Draft'}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="rounded-2xl bg-slate-100 px-3 py-2">Duration: {exam.durationMinutes || 'N/A'} mins</span>
              <span className="rounded-2xl bg-slate-100 px-3 py-2">Questions: {exam.questionCount ?? '—'}</span>
              <span className="rounded-2xl bg-slate-100 px-3 py-2">Created: {new Date(exam.createdAt ?? Date.now()).toLocaleDateString()}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="text-indigo-600 font-medium transition hover:text-indigo-500" to={`/teacher/exams/${exam.id}`}>
                View exam
              </Link>
              <Link className="text-slate-500 transition hover:text-slate-700" to={`/teacher/exams/${exam.id}/edit`}>
                Edit details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
