import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ExamPreview {
  id: string;
  title: string;
  date: string;
  duration: number;
}

interface UpcomingExamsProps {
  exams?: ExamPreview[];
}

export default function UpcomingExams({ exams = [] }: UpcomingExamsProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Upcoming Exams</h2>
        <button 
          onClick={() => navigate('/student/exams')}
          className="text-sm font-medium text-sky-400 hover:text-sky-300 transition"
        >
          View All
        </button>
      </div>

      {exams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-500/50 mb-3" />
          <p className="text-sm font-medium text-slate-300">You're all caught up!</p>
          <p className="text-xs text-slate-500 mt-1">No pending exams scheduled.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {exams.map((exam) => (
            <div 
              key={exam.id}
              className="group relative flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-sky-500/30 hover:bg-slate-900"
            >
              <div>
                <h3 className="font-semibold text-slate-200">{exam.title}</h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </span>
                  <span>•</span>
                  <span>{exam.duration} mins</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate(`/student/exam/${exam.id}`)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-sm font-semibold text-slate-200 transition group-hover:bg-sky-500 group-hover:text-white"
              >
                <span>View Details</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}