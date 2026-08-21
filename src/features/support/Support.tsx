import React from 'react';
import { LifeBuoy, Plus, MessageSquare } from 'lucide-react';

export default function Support() {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-primary-foreground tracking-tight">Support Desk</h1>
          <p className="text-sm text-slate-400 mt-1">Get help with exams, technical issues, or billing.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-sky-400">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-primary-foreground mb-2">My Tickets</h2>
          
          <div className="bg-slate-900/80 border border-border/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-sky-500/30 transition">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-amber-500/10 text-amber-400 p-2 rounded-xl"><LifeBuoy className="w-5 h-5" /></div>
              <div>
                <h3 className="text-base font-bold text-primary-foreground">Webcam not detecting during exam start</h3>
                <p className="text-sm text-slate-400 mt-1">Ticket #1042 • Opened 2 hours ago</p>
              </div>
            </div>
            <span className="inline-flex rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400 shrink-0">In Progress</span>
          </div>

          <div className="bg-slate-900/80 border border-border/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 opacity-75 hover:opacity-100 transition">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-slate-800 text-slate-400 p-2 rounded-xl"><MessageSquare className="w-5 h-5" /></div>
              <div>
                <h3 className="text-base font-bold text-primary-foreground">How to change my time zone?</h3>
                <p className="text-sm text-slate-400 mt-1">Ticket #0981 • Closed Aug 01, 2026</p>
              </div>
            </div>
            <span className="inline-flex rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-400 shrink-0">Resolved</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-border/10 rounded-3xl p-6 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-primary-foreground uppercase tracking-wider mb-4">Quick Help</h3>
            <ul className="space-y-3">
              <li><a href="/faq" className="text-sm text-sky-400 hover:underline">How does AI proctoring work?</a></li>
              <li><a href="/faq" className="text-sm text-sky-400 hover:underline">System requirements for exams</a></li>
              <li><a href="/faq" className="text-sm text-sky-400 hover:underline">Resetting my password</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}