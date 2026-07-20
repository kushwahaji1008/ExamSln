import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { genExams } from '@/services/api/generated';
import PageHeader from '@/components/ui/PageHeader';

export default function ExamsList() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    genExams.listExams().then(setExams).catch(() => setExams([]));
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="Available Exams" subtitle="Choose an upcoming exam and begin your preparation with a clean, interactive experience." />

      {exams.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500 shadow-sm">
          No exams are currently available. Check back soon.
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {exams.map((exam) => (
            <Link
              key={exam.id}
              to={`/student/exams/${exam.id}`}
              className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-sky-100/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{exam.title || 'Untitled Exam'}</h2>
                  <p className="mt-2 text-sm text-slate-500">{exam.description || 'Complete this exam to review your readiness.'}</p>
                </div>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Exam
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
                <span className="rounded-2xl bg-slate-100 px-3 py-2">Duration: {exam.durationMinutes || 'N/A'} mins</span>
                <span className="rounded-2xl bg-slate-100 px-3 py-2">Status: {exam.status || 'Open'}</span>
                <span className="rounded-2xl bg-slate-100 px-3 py-2">Questions: {exam.questionCount ?? '—'}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
