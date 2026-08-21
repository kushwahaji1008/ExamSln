import React from 'react';
import { Target, CheckCircle2, Play, Award } from 'lucide-react';

export type ActivityType = 'exam' | 'lesson' | 'achievement';

export interface ActivityItem {
  id: string;
  title: string;
  type: ActivityType;
  timestamp: string;
  score?: number;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export default function RecentActivity({ activities = [] }: RecentActivityProps) {
  const getIcon = (type: ActivityType) => {
    switch (type) {
      case 'exam': return <Target className="h-4 w-4 text-rose-400" />;
      case 'lesson': return <Play className="h-4 w-4 text-sky-400" />;
      case 'achievement': return <Award className="h-4 w-4 text-amber-400" />;
      default: return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
    }
  };

  const getBg = (type: ActivityType) => {
    switch (type) {
      case 'exam': return 'bg-rose-500/10 border-rose-500/20';
      case 'lesson': return 'bg-sky-500/10 border-sky-500/20';
      case 'achievement': return 'bg-amber-500/10 border-amber-500/20';
      default: return 'bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="rounded-3xl border border-border/10 bg-slate-900/80 p-6 backdrop-blur-xl h-full">
      <h2 className="text-lg font-bold text-primary-foreground mb-6">Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">No recent activity to show.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((item, idx) => (
            <div key={item.id} className="flex gap-4 relative">
              {/* Timeline Connector */}
              {idx !== activities.length - 1 && (
                <div className="absolute left-[1.1rem] top-10 h-[calc(100%-1rem)] w-px bg-slate-800" />
              )}
              
              <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${getBg(item.type)} z-10`}>
                {getIcon(item.type)}
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                  <span className="text-xs font-medium text-slate-500 shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                {item.type === 'exam' && item.score !== undefined && (
                  <p className="text-xs font-medium text-emerald-400 mt-1">
                    Scored {item.score}%
                  </p>
                )}
                {item.type === 'lesson' && (
                  <p className="text-xs text-slate-400 mt-1">Completed module</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}