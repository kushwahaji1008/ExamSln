import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';

interface WelcomeCardProps {
  userName: string;
}

export default function WelcomeCard({ userName }: WelcomeCardProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-700 p-8 text-white shadow-2xl shadow-sky-500/20">
      <div className="absolute inset-x-0 top-0 h-40 bg-white/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-sm shadow-white/5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Student Portal</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-sky-100 font-medium">
            <Calendar className="h-4 w-4" />
            {today}
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back, {userName.split(' ')[0]}!
          </h1>
          <p className="mt-2 text-lg text-sky-100 max-w-lg">
            You have 2 assignments due this week and 1 upcoming live class. Keep up the great momentum!
          </p>
        </div>
      </div>
    </div>
  );
}