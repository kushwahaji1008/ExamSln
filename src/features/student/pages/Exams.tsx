import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, PlayCircle, Calendar, CheckCircle2 } from 'lucide-react';

export default function Exams() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'past'>('upcoming');

  // Mock Data - Replace with API hook
  const exams = [
    { id: '1', title: 'Advanced React Patterns', status: 'upcoming', date: '2026-08-15T10:00:00Z', duration: 60, marks: 100 },
    { id: '2', title: 'System Architecture 101', status: 'active', date: '2026-08-03T02:00:00Z', duration: 90, marks: 150 },
    { id: '3', title: 'Data Structures Midterm', status: 'past', date: '2026-07-20T10:00:00Z', duration: 120, marks: 100, score: 85 },
  ];

  const filteredExams = exams.filter(e => e.status === activeTab);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">My Exams</h1>
        <p className="mt-2 text-sm text-slate-400">Manage your upcoming assessments and view past attempt records.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 rounded-xl bg-slate-900/50 p-1 border border-white/5 w-fit">
        {['upcoming', 'active', 'past'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`capitalize rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredExams.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            No {activeTab} exams found.
          </div>
        ) : (
          filteredExams.map((exam) => (
            <div key={exam.id} className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl transition hover:border-sky-500/30">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <FileText className="h-5 w-5" />
                  </div>
                  {exam.status === 'active' && (
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live Now
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{exam.title}</h3>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="h-4 w-4" />
                    {new Date(exam.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="h-4 w-4" />
                    {exam.duration} Minutes • {exam.marks} Marks
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                {exam.status === 'active' ? (
                  <button onClick={() => navigate(`/student/exam/${exam.id}/start`)} className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400">
                    <PlayCircle className="h-4 w-4" /> Start Attempt
                  </button>
                ) : exam.status === 'upcoming' ? (
                  <button disabled className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-sm font-semibold text-slate-400 cursor-not-allowed">
                    <Clock className="h-4 w-4" /> Starts Soon
                  </button>
                ) : (
                  <button onClick={() => navigate(`/student/results/${exam.id}`)} className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 border border-white/5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> View Result ({exam.score}%)
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}