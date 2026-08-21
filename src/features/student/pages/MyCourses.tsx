import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, PlayCircle, Clock } from 'lucide-react';

export default function MyCourses() {
  const navigate = useNavigate();

  // Mock Data
  const courses = [
    { id: '101', title: 'Fullstack Next.js Bootcamp', instructor: 'Sarah Jenkins', progress: 65, totalLessons: 42, completedLessons: 27 },
    { id: '102', title: 'Data Structures in Python', instructor: 'Alan Turing', progress: 12, totalLessons: 30, completedLessons: 4 },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary-foreground">My Courses</h1>
          <p className="mt-2 text-sm text-slate-400">Pick up right where you left off.</p>
        </div>
        <button onClick={() => navigate('/student/catalog')} className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-slate-700">
          Browse Catalog
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="group overflow-hidden rounded-3xl border border-border/10 bg-slate-900/80 backdrop-blur-xl transition hover:border-emerald-500/30">
            {/* Header Image Area */}
            <div className="h-32 bg-slate-950 flex items-center justify-center border-b border-border/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <BookOpen className="h-10 w-10 text-slate-700" />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-primary-foreground leading-tight mb-1">{course.title}</h3>
              <p className="text-sm text-slate-400 mb-6">by {course.instructor}</p>

              {/* Progress */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{course.progress}% Complete</span>
                  <span className="text-slate-500">{course.completedLessons} / {course.totalLessons} Lessons</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-950 border border-border/5">
                  <div className="h-full rounded-full bg-emerald-500 transition-all duration-1000" style={{ width: `${course.progress}%` }} />
                </div>
              </div>

              <button onClick={() => navigate(`/student/course/${course.id}`)} className="w-full flex items-center justify-center gap-2 rounded-xl bg-card px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-slate-200 shadow-xl shadow-border/5">
                <PlayCircle className="h-4 w-4" /> Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}