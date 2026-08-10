import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Search, Plus, PlayCircle, Edit3, Trash2, LayoutList, FileText, Loader2, BookOpen, AlertCircle } from 'lucide-react';
import  apiClient  from '@/services/api/client'; // Your Axios instance

// Define the interface based on your C# Course model
interface Course {
  id: string;
  title: string;
  description: string;
  status: number; // 0 = Draft, 1 = Published, etc.
  chapterIds?: string[];
  examIds?: string[];
}

export default function MyCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real state for backend data
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Teacher's Courses on Mount
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        // Change to '/api/videos/courses' if you didn't rename your backend route yet
        const response = await apiClient.get('/api/videos/courses'); 
        
        // If your backend returns all courses, you might need a specific endpoint like '/api/courses/teacher/me' 
        // For now, assuming the backend filters by the logged-in user's token
        setCourses(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch courses:", err);
        setError(err.response?.data?.message || 'Failed to load your courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  // Filter based on search input
  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (courseId: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      await apiClient.delete(`/api/videos/courses/${courseId}`);
      // Remove from UI after successful deletion
      setCourses(courses.filter(c => c.id !== courseId));
    } catch (err) {
      alert("Failed to delete course.");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-12">
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

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading your courses...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600">
          <AlertCircle className="w-8 h-8 mb-2" />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredCourses.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[2rem] bg-white">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No courses yet</h3>
          <p className="text-slate-500 mb-6">Create your first course to start building your curriculum.</p>
          <Link to="/teacher/courses/create" className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-600 px-6 py-2.5 text-sm font-bold hover:bg-indigo-100 transition">
            <Plus className="w-4 h-4" /> Create Course
          </Link>
        </div>
      )}

      {/* Course Grid */}
      {!loading && !error && filteredCourses.length > 0 && (
        <div className="grid gap-6 xl:grid-cols-3 sm:grid-cols-2">
          {filteredCourses.map((course) => (
            <div key={course.id} className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
              <div className="w-full h-32 bg-slate-100 rounded-2xl mb-4 flex items-center justify-center border border-slate-200/50">
                <PlayCircle className="w-10 h-10 text-slate-300" />
              </div>
              
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-bold text-slate-900 line-clamp-2">{course.title}</h2>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium text-slate-600">
                <span className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5 border border-slate-100">
                  <LayoutList className="w-3.5 h-3.5 text-indigo-500" /> {course.chapterIds?.length || 0} Modules
                </span>
                <span className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5 border border-slate-100">
                  <FileText className="w-3.5 h-3.5 text-sky-500" /> {course.examIds?.length || 0} Exams
                </span>
              </div>

              <div className="mt-6 pt-4 flex items-center justify-between border-t border-slate-100">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  course.status === 1 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'
                }`}>
                  {course.status === 1 ? 'Published' : 'Draft'}
                </span>
                <div className="flex items-center gap-1">
                  <Link to={`/teacher/courses/${course.id}/edit`} className="p-2 text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600 rounded-xl" title="Course Builder">
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(course.id!)} className="p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 rounded-xl">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}