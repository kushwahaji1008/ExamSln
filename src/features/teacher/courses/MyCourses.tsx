import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Search, Plus, PlayCircle, Edit3, Trash2, LayoutList, FileText } from 'lucide-react';

export default function MyCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data representing the CourseService models
  const courses = [
    { id: 'c1', title: 'Full-Stack Web Development', modules: 12, exams: 2, status: 'Published' },
    { id: 'c2', title: 'Data Structures & Algorithms', modules: 8, exams: 1, status: 'Draft' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      <PageHeader title="My Courses" subtitle="Manage your curriculums, video lectures, and attached exams." />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
          />
        </div>
        <Link className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500" to="/teacher/courses/create">
          <Plus className="w-4 h-4" /> New Course
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-3 sm:grid-cols-2">
        {courses.map((course) => (
          <div key={course.id} className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
            <div className="w-full h-32 bg-slate-100 rounded-2xl mb-4 flex items-center justify-center border border-slate-200/50">
              <PlayCircle className="w-10 h-10 text-slate-300" />
            </div>
            
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-900 line-clamp-2">{course.title}</h2>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5 border border-slate-100">
                <LayoutList className="w-3.5 h-3.5 text-indigo-500" /> {course.modules} Modules
              </span>
              <span className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5 border border-slate-100">
                <FileText className="w-3.5 h-3.5 text-sky-500" /> {course.exams} Exams
              </span>
            </div>

            <div className="mt-6 pt-4 flex items-center justify-between border-t border-slate-100">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${course.status === 'Published' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                {course.status}
              </span>
              <div className="flex items-center gap-1">
                <Link to={`/teacher/courses/${course.id}/edit`} className="p-2 text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600 rounded-xl" title="Course Builder">
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button className="p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 rounded-xl">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}