import React from 'react';
import { Video, Calendar, User, ArrowRight } from 'lucide-react';

export default function LiveClasses() {
  const liveClasses = [
    { id: '1', title: 'Q&A Session: Database Normalization', instructor: 'Sarah Jenkins', time: 'Today, 3:00 PM', status: 'live' },
    { id: '2', title: 'React Performance Optimization', instructor: 'Dan Abramov', time: 'Tomorrow, 10:00 AM', status: 'scheduled' },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-foreground">Live Classes</h1>
        <p className="mt-2 text-sm text-slate-400">Join interactive sessions and expert-led webinars.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {liveClasses.map((session) => (
          <div key={session.id} className="flex flex-col sm:flex-row gap-6 rounded-3xl border border-border/10 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <Video className="h-8 w-8 text-indigo-400" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {session.status === 'live' ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 border border-rose-500/20 animate-pulse">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> Live Now
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Scheduled
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-primary-foreground">{session.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2"><User className="h-4 w-4" /> {session.instructor}</div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {session.time}</div>
              </div>

              <button 
                disabled={session.status !== 'live'}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition ${
                  session.status === 'live' 
                    ? 'bg-indigo-500 text-primary-foreground hover:bg-indigo-400 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Join Session <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}