import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, ArrowRight } from 'lucide-react';

interface RecommendedCourse {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  thumbnailUrl?: string;
}

interface RecommendedCoursesProps {
  courses?: RecommendedCourse[];
}

export default function RecommendedCourses({ courses = [] }: RecommendedCoursesProps) {
  const navigate = useNavigate();

  if (courses.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">Recommended for you</h2>
        <button 
          onClick={() => navigate('/student/courses')}
          className="text-sm font-semibold text-sky-400 hover:text-sky-300 transition flex items-center gap-1"
        >
          View Catalog <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden transition-all duration-300 hover:bg-slate-800 hover:border-sky-500/30 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1"
            onClick={() => navigate(`/student/course/${course.id}`)}
          >
            {/* Thumbnail Area */}
            <div className="aspect-video w-full bg-slate-950 relative overflow-hidden">
              {course.thumbnailUrl ? (
                <img src={course.thumbnailUrl} alt={course.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition duration-300" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-slate-950 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-sky-400/50" />
                  </div>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-5">
              <h3 className="font-bold text-slate-100 line-clamp-2 leading-snug mb-2 group-hover:text-sky-400 transition">
                {course.title}
              </h3>
              <p className="text-xs text-slate-400 mb-4">{course.instructor}</p>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  {course.rating.toFixed(1)}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Users className="h-3.5 w-3.5" />
                  {course.students.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}