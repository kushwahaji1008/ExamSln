import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, Clock, CheckCircle2, ChevronLeft, PlayCircle } from 'lucide-react';

export default function ExamDetails() {
  const { examId } = useParams();
  const navigate = useNavigate();

  // Mock details
  const exam = {
    title: 'System Architecture Midterm',
    durationMinutes: 90,
    totalMarks: 100,
    passingMarks: 65,
    proctored: true,
    description: 'This exam covers distributed systems, caching strategies, and database sharding techniques discussed in weeks 1-6.'
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Exams
      </button>

      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur-xl shadow-2xl">
        <div className="mb-8 border-b border-white/10 pb-8">
          <h1 className="text-3xl font-extrabold text-white mb-4">{exam.title}</h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl">{exam.description}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <div className="rounded-2xl bg-slate-950/50 p-5 border border-white/5">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Duration</div>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-sky-400" /> {exam.durationMinutes} min
            </div>
          </div>
          <div className="rounded-2xl bg-slate-950/50 p-5 border border-white/5">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Total Marks</div>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" /> {exam.totalMarks}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-950/50 p-5 border border-white/5">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Passing Marks</div>
            <div className="text-2xl font-bold text-white">{exam.passingMarks}</div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h3 className="text-lg font-bold text-white">Instructions & Rules</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
              Ensure you have a stable internet connection before starting.
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
              Do not refresh the page or navigate away once the exam begins.
            </li>
            {exam.proctored && (
              <li className="flex items-start gap-3 text-rose-300 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                This is a proctored exam. Tab switching, screen sharing, and exiting full-screen mode are monitored and will be logged as violations.
              </li>
            )}
          </ul>
        </div>

        <button 
          onClick={() => navigate(`/student/exam/${examId}/attempt`)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 py-4 text-base font-bold text-white transition hover:bg-sky-400 shadow-lg shadow-sky-500/25"
        >
          <PlayCircle className="h-5 w-5" /> Start Assessment Now
        </button>
      </div>
    </div>
  );
}