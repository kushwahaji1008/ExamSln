import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Search, PlayCircle, BookOpen, Clock, Star, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import apiClient from '@/services/api/client';

interface Course {
  id: string;
  title: string;
  instructorName: string;
  totalDurationMinutes: number;
  averageRating: number;
  chapterIds?: string[];
  isFree?: boolean;
  price?: number;
}

export default function StudentCourses() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'enrolled' | 'all'>('enrolled');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  // Fetch courses whenever the tab changes
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        // Toggle endpoint based on tab
        const endpoint = activeTab === 'enrolled' 
          ? '/videos/courses' // Your backend route for student's enrolled courses
          : '/courses';       // Your backend route for all available courses
          
        const response = await apiClient.get(endpoint);
        setCourses(response.data);
      } catch (err: any) {
        console.error("Failed to fetch courses:", err);
        setError(err.response?.data?.message || 'Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [activeTab]);

  // Handle Enrollment
  const handleEnroll = async (courseId: string) => {
    try {
      setEnrollingId(courseId);
      // Your backend route to enroll a student in a course
      await apiClient.post(`/videos/courses/${courseId}`);
      alert("Successfully enrolled!");
      navigate(`/student/courses/${courseId}`); // Go straight to the course!
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to enroll. Please try again.");
    } finally {
      setEnrollingId(null);
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-12">
      <PageHeader title="Learning Center" subtitle="Access your enrolled courses or browse the catalog for new skills." />

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
        <div className="flex p-1 bg-slate-200/50 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('enrolled')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'enrolled' ? 'bg-slate-100 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            My Courses
          </button>
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-slate-100 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Browse Catalog
          </button>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 py-2.5 text-sm outline-none transition focus:border-indigo-500"
          />
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading {activeTab === 'enrolled' ? 'your' : 'available'} courses...</p>
        </div>
      )}

      {!loading && error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-center font-bold">
          <AlertCircle className="w-6 h-6 mx-auto mb-2" /> {error}
        </div>
      )}

      {!loading && !error && filteredCourses.length === 0 && (
        <div className="text-center py-20 text-slate-500 bg-slate-50 border border-slate-200 rounded-[2rem]">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">No courses found</h3>
          {activeTab === 'enrolled' ? (
            <button onClick={() => setActiveTab('all')} className="text-indigo-600 font-bold hover:underline">Browse Catalog to Enroll</button>
          ) : (
            <p>Try adjusting your search criteria.</p>
          )}
        </div>
      )}

      {/* Course Grid */}
      {!loading && !error && filteredCourses.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div key={course.id} className="group flex flex-col rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
              <div className="w-full h-40 bg-slate-100 rounded-2xl mb-5 flex items-center justify-center border border-slate-200/50">
                <PlayCircle className="w-12 h-12 text-slate-300 group-hover:text-indigo-400 transition" />
              </div>
              
              <div className="px-2 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-slate-900 line-clamp-2 mb-1">{course.title}</h2>
                <p className="text-sm text-slate-500 mb-4">{course.instructorName || 'Unknown Instructor'}</p>

                <div className="grid grid-cols-2 gap-2 text-sm font-medium text-slate-600 mb-4">
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-slate-400" /> {course.chapterIds?.length || 0} Modules</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {course.totalDurationMinutes || 0} mins</span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  {activeTab === 'enrolled' ? (
                    <Link to={`/student/courses/${course.id}`} className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-2.5 rounded-xl text-sm font-bold transition">
                      <PlayCircle className="w-4 h-4" /> Continue Learning
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrollingId === course.id}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 text-primary-foreground hover:bg-slate-800 py-2.5 rounded-xl text-sm font-bold transition disabled:opacity-50"
                    >
                      {enrollingId === course.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enroll Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}