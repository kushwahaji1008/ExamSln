import React from 'react';
import { Bell, BookOpen, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    { id: 1, type: 'exam', title: 'New Exam Scheduled', message: 'Midterm CS101 is scheduled for tomorrow at 10:00 AM.', time: '2 hours ago', unread: true },
    { id: 2, type: 'grade', title: 'Results Published', message: 'Your results for Physics 202 are now available.', time: '1 day ago', unread: true },
    { id: 3, type: 'system', title: 'System Maintenance', message: 'The platform will be down for 15 minutes on Sunday.', time: '3 days ago', unread: false },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Notifications</h1>
          <p className="text-sm text-slate-400 mt-1">Stay updated on your exams, results, and system alerts.</p>
        </div>
        <button className="text-sm text-sky-400 hover:text-sky-300 font-semibold transition">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {notifications.map(notif => (
          <div key={notif.id} className={`flex gap-4 p-5 rounded-2xl border transition-all ${notif.unread ? 'bg-slate-900/80 border-sky-500/30 shadow-lg shadow-sky-500/5' : 'bg-slate-900/40 border-white/5 opacity-75'}`}>
            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notif.type === 'exam' ? 'bg-sky-500/10 text-sky-400' : notif.type === 'grade' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {notif.type === 'exam' && <BookOpen className="w-5 h-5" />}
              {notif.type === 'grade' && <CheckCircle2 className="w-5 h-5" />}
              {notif.type === 'system' && <ShieldAlert className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold ${notif.unread ? 'text-white' : 'text-slate-300'}`}>{notif.title}</h3>
                <span className="text-xs text-slate-500">{notif.time}</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{notif.message}</p>
            </div>
            {notif.unread && <div className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}