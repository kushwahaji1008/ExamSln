import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { genExams } from '@/services/api/generated';
import PageHeader from '@/components/ui/PageHeader';
import { 
  Search, 
  Plus, 
  Clock, 
  HelpCircle, 
  Calendar, 
  Eye, 
  Edit3, 
  Trash2, 
  Loader2, 
  AlertCircle, 
  FileText 
} from 'lucide-react';

export default function MyExams() {
  const [exams, setExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchExams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await genExams.listExams();
      setExams(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load exams. Please try again later.');
      setExams([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (examId: string) => {
    if (!window.confirm('Are you sure you want to delete this exam? This action cannot be undone.')) return;
    
    try {
      // Assuming deleteExam exists in your generated API. 
      // If it's named differently, update the method call below (e.g., genExams.delete(examId))
      await genExams.deleteExam(examId); 
      setExams((prev) => prev.filter(e => e.id !== examId));
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to delete exam.');
    }
  };

  const filteredExams = exams.filter(exam => 
    (exam.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (exam.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      
      <PageHeader 
        title="My Exams" 
        subtitle="Create, review, and manage exam sessions with fast actions and clear status information." 
      />

      {/* Controls Section: Search & Create Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search exams by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
          />
        </div>
        
        <Link 
          className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 active:translate-y-0" 
          to="/teacher/exams/create"
        >
          <Plus className="w-4 h-4" />
          <span>New Exam</span>
        </Link>
      </div>

      {/* State Rendering */}
      {isLoading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4 rounded-[2rem] border border-slate-200 bg-white p-8">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <p className="text-sm text-slate-500 font-medium">Loading your exams...</p>
        </div>
      ) : error ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4 rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-center">
          <AlertCircle className="w-10 h-10 text-rose-500" />
          <p className="text-rose-700 font-semibold">{error}</p>
          <button onClick={fetchExams} className="text-sm text-rose-600 hover:text-rose-800 underline underline-offset-2 font-medium">
            Try Again
          </button>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">No exams found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">
              {searchQuery ? "We couldn't find any exams matching your search." : "You haven't created any exams yet. Get started by clicking the New Exam button."}
            </p>
          </div>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-sm text-indigo-600 font-semibold hover:text-indigo-700">
              Clear search
            </button>
          )}
        </div>
      ) : (
        /* Exam Grid */
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredExams.map((exam) => {
            const isPublished = exam.status?.toLowerCase() === 'published' || exam.isPublished;
            
            return (
              <div key={exam.id} className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
                
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-900 line-clamp-1" title={exam.title}>
                      {exam.title || 'Untitled Exam'}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 line-clamp-2 min-h-[2.5rem]">
                      {exam.description || 'No description provided for this exam.'}
                    </p>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    isPublished 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Metrics */}
                <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
                  <span className="flex items-center gap-1.5 rounded-2xl bg-slate-50 px-3 py-2 border border-slate-100">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    {exam.durationMinutes || 'N/A'} mins
                  </span>
                  <span className="flex items-center gap-1.5 rounded-2xl bg-slate-50 px-3 py-2 border border-slate-100">
                    <HelpCircle className="w-4 h-4 text-sky-500" />
                    {exam.questionCount ?? '—'} Qs
                  </span>
                  <span className="flex items-center gap-1.5 rounded-2xl bg-slate-50 px-3 py-2 border border-slate-100">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    {new Date(exam.createdAt ?? Date.now()).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions Footer */}
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
                  <Link 
                    className="flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-500" 
                    to={`/teacher/exams/${exam.id}`}
                  >
                    <Eye className="w-4 h-4" /> View Details
                  </Link>
                  
                  <div className="flex items-center gap-2">
                    <Link 
                      className="flex items-center gap-2 rounded-xl p-2 text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600" 
                      to={`/teacher/exams/${exam.id}/edit`}
                      title="Edit Exam"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(exam.id)}
                      className="flex items-center gap-2 rounded-xl p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                      title="Delete Exam"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}