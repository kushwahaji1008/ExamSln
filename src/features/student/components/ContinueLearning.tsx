import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, BookOpen } from 'lucide-react';

interface ActiveCourse {
  id: string;
  title: string;
  currentChapter: string;
  progressPercentage: number;
  timeLeft: string;
}

interface ContinueLearningProps {
  course?: ActiveCourse | null;
}

export default function ContinueLearning({ course }: ContinueLearningProps) {
  const navigate = useNavigate();

  if (!course) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur-xl text-center">
        <BookOpen className="mx-auto h-12 w-12 text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Ready to start?</h2>
        <p className="text-slate-400 mb-6">You don't have any active courses yet. Browse the catalog to begin learning.</p>
        <button 
          onClick={() => navigate('/student/courses')}
          className="rounded-xl bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400 shadow-lg shadow-sky-500/20"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl transition duration-500 group-hover:bg-sky-500/20 pointer-events-none" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-xl font-bold text-white tracking-tight">Continue Learning</h2>
        <span className="text-sm font-medium text-sky-400">{course.progressPercentage}% Complete</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center relative z-10">
        {/* Placeholder Thumbnail (Replace with actual image if available) */}
        <div className="h-32 w-full sm:w-48 shrink-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center border border-slate-700/50 shadow-inner">
          <PlayCircle className="h-10 w-10 text-slate-600" />
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div>
            <h3 className="text-2xl font-bold text-slate-100">{course.title}</h3>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Currently on: <span className="text-slate-200">{course.currentChapter}</span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-950 border border-white/5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-1000"
                style={{ width: `${course.progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{course.timeLeft} left in this module</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate(`/student/course/${course.id}`)}
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-950 px-6 py-3 text-sm font-bold transition hover:bg-slate-200 hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
        >
          <PlayCircle className="h-4 w-4" />
          Resume
        </button>
      </div>
    </div>
  );
}