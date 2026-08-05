import React from 'react';
import { Calendar, Clock, Video, FileText } from 'lucide-react';

export default function Schedule() {
  const scheduleEvents = [
    { id: '1', date: 'Today', items: [
      { id: 'a1', title: 'React Workshop', type: 'class', time: '14:00' },
      { id: 'a2', title: 'Midterm Submission Due', type: 'deadline', time: '23:59' }
    ]},
    { id: '2', date: 'Tomorrow', items: [
      { id: 'b1', title: 'System Architecture Exam', type: 'exam', time: '10:00' },
    ]}
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'class': return <Video className="h-4 w-4 text-indigo-400" />;
      case 'exam': return <FileText className="h-4 w-4 text-emerald-400" />;
      default: return <Clock className="h-4 w-4 text-rose-400" />;
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Schedule</h1>
        <p className="mt-2 text-sm text-slate-400">Track all your upcoming commitments and deadlines.</p>
      </div>

      <div className="space-y-8">
        {scheduleEvents.map((group) => (
          <div key={group.id} className="relative">
            <div className="sticky top-0 z-10 flex items-center gap-3 py-2 bg-slate-950">
              <Calendar className="h-5 w-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white">{group.date}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent ml-2" />
            </div>

            <div className="mt-4 space-y-4 pl-8 border-l border-slate-800 ml-2.5">
              {group.items.map((item) => (
                <div key={item.id} className="relative rounded-2xl border border-white/5 bg-slate-900/50 p-5 transition hover:bg-slate-800/80">
                  {/* Timeline dot */}
                  <div className="absolute -left-[3.25rem] top-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 border border-slate-700">
                    {getIcon(item.type)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-200">{item.title}</h3>
                      <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-1">{item.type}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-1.5 text-sm font-semibold text-slate-300 border border-white/5">
                      <Clock className="h-3.5 w-3.5 text-slate-500" /> {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}