import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Search, PlayCircle, BookOpen, Clock, Star, ArrowRight } from 'lucide-react';

export default function StudentCourses() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for available courses
  const courses = [
    { id: 'c1', title: 'Complete Python Bootcamp 2026', instructor: 'Dr. Angela Yu', modules: 14, duration: '22h 30m', rating: 4.8, students: '12k+' },
    { id: 'c2', title: 'Data Structures & Algorithms', instructor: 'Prof. John Smith', modules: 8, duration: '15h 10m', rating: 4.9, students: '8k+' },
    { id: 'c3', title: 'Machine Learning A-Z', instructor: 'Andrew Ng', modules: 12, duration: '18h 00m', rating: 4.9, students: '25k+' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      <PageHeader title="Course Catalog" subtitle="Discover new skills and enroll in expert-led courses." />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search for courses, subjects, or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white pl-12 pr-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link 
            key={course.id} 
            to={`/student/courses/${course.id}`}
            className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100"
          >
            {/* Thumbnail Placeholder */}
            <div className="w-full h-40 bg-slate-100 rounded-2xl mb-5 flex items-center justify-center border border-slate-200/50 group-hover:bg-indigo-50 transition">
              <PlayCircle className="w-12 h-12 text-slate-300 group-hover:text-indigo-400 transition" />
            </div>
            
            <div className="px-2 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-wider">Programming</span>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {course.rating}
                </div>
              </div>
              
              <h2 className="text-lg font-bold text-slate-900 line-clamp-2 mb-1 group-hover:text-indigo-600 transition">
                {course.title}
              </h2>
              <p className="text-sm text-slate-500 mb-4">{course.instructor}</p>

              <div className="mt-auto grid grid-cols-2 gap-2 text-sm font-medium text-slate-600 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-slate-400" /> {course.modules} Modules</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {course.duration}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}