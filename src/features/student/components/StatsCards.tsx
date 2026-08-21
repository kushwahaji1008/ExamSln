import React from 'react';
import { BookOpen, Target, Award } from 'lucide-react';

interface StatsCardsProps {
  activeCourses?: number;
  completedExams?: number;
  averageScore?: number;
}

export default function StatsCards({ 
  activeCourses = 0, 
  completedExams = 0, 
  averageScore = 0 
}: StatsCardsProps) {
  
  const stats = [
    {
      label: 'Active Courses',
      value: activeCourses,
      icon: BookOpen,
      color: 'text-sky-400',
      bg: 'bg-sky-400/10',
    },
    {
      label: 'Exams Completed',
      value: completedExams,
      icon: Target,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
    {
      label: 'Average Score',
      value: `${averageScore}%`,
      icon: Award,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 h-full">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div 
            key={idx} 
            className="flex items-center gap-4 rounded-2xl border border-border/10 bg-slate-900/80 p-5 backdrop-blur-xl transition hover:bg-slate-800/80"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}