import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, BarChart3, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';

export default function Results() {
  const navigate = useNavigate();
  
  const results = [
    { id: '1', examTitle: 'Midterm Assessment', date: 'August 1, 2026', score: 92, status: 'pass' },
    { id: '2', examTitle: 'Pop Quiz: Node.js', date: 'July 28, 2026', score: 45, status: 'fail' },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-foreground">My Results</h1>
        <p className="mt-2 text-sm text-slate-400">Review your past performance and analytical breakdowns.</p>
      </div>

      <div className="grid gap-6">
        {results.map((result) => (
          <div key={result.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-border/10 bg-slate-900/80 p-5 backdrop-blur-xl transition hover:bg-slate-800/80">
            <div className="flex items-center gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${
                result.status === 'pass' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
              }`}>
                {result.status === 'pass' ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary-foreground">{result.examTitle}</h3>
                <p className="text-sm text-slate-400 mt-1">Submitted on {result.date}</p>
              </div>
            </div>

            <div className="flex w-full sm:w-auto items-center justify-between gap-8 border-t border-border/5 sm:border-0 pt-4 sm:pt-0">
              <div className="text-center">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Score</div>
                <div className={`text-xl font-bold ${result.status === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.score}%
                </div>
              </div>
              
              <button 
                onClick={() => navigate(`/student/results/${result.id}`)}
                className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-sky-500"
              >
                <BarChart3 className="h-4 w-4" /> Review <ChevronRight className="h-4 w-4 hidden sm:block" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}