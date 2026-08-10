import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Search, Plus, FileText, Edit3, Trash2, Clock, Target, ShieldAlert, Loader2, AlertCircle, Calendar } from 'lucide-react';
import  apiClient  from '@/services/api/client';

// Define the interface based on your C# Exam schema
interface Exam {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  scheduledStartTime: string;
  totalMarks: number;
  passingMarks: number;
  questionIds?: string[];
  settings?: {
    requireProctoring: boolean;
    enableNegativeMarking: boolean;
  };
}

export default function MyExams() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for backend data
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Teacher's Exams on Mount
  useEffect(() => {
    const fetchMyExams = async () => {
      try {
        setLoading(true);
        // Ensure this matches your backend route for fetching exams
        const response = await apiClient.get('/api/exams'); 
        setExams(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch exams:", err);
        setError(err.response?.data?.message || 'Failed to load your exams. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyExams();
  }, []);

  // Filter based on search input
  const filteredExams = exams.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (examId: string) => {
    if (!window.confirm("Are you sure you want to delete this exam? This action cannot be undone.")) return;
    
    try {
      await apiClient.delete(`/api/exams/${examId}`);
      // Remove from UI after successful deletion
      setExams(exams.filter(e => e.id !== examId));
    } catch (err) {
      alert("Failed to delete the exam.");
    }
  };

  // Helper to format the date beautifully
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not scheduled";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' 
    }).format(date);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-12">
      <PageHeader title="Exam Manager" subtitle="Create, edit, and manage all your course assessments." />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
          />
        </div>
        <Link className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500" to="/teacher/exams/create">
          <Plus className="w-4 h-4" /> New Exam
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading your exams...</p>
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
      {!loading && !error && filteredExams.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[2rem] bg-white">
          <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No exams found</h3>
          <p className="text-slate-500 mb-6">You haven't created any assessments yet.</p>
          <Link to="/teacher/exams/create" className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-600 px-6 py-2.5 text-sm font-bold hover:bg-indigo-100 transition">
            <Plus className="w-4 h-4" /> Create Exam
          </Link>
        </div>
      )}

      {/* Exam Grid */}
      {!loading && !error && filteredExams.length > 0 && (
        <div className="grid gap-6 xl:grid-cols-3 sm:grid-cols-2">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
              
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
                  <FileText className="w-6 h-6 text-indigo-500" />
                </div>
                {exam.settings?.requireProctoring && (
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full border border-rose-100">
                    <ShieldAlert className="w-3 h-3" /> Proctored
                  </span>
                )}
              </div>
              
              <h2 className="text-lg font-bold text-slate-900 line-clamp-1 mb-1" title={exam.title}>{exam.title}</h2>
              <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4">
                <Calendar className="w-4 h-4" /> {formatDate(exam.scheduledStartTime)}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    <Clock className="w-3.5 h-3.5" /> Duration
                  </div>
                  <div className="font-bold text-slate-900">{exam.durationMinutes} Mins</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    <Target className="w-3.5 h-3.5" /> Marks
                  </div>
                  <div className="font-bold text-slate-900">{exam.totalMarks}</div>
                </div>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                <span className="text-sm font-semibold text-slate-600">
                  {exam.questionIds?.length || 0} Questions
                </span>
                
                <div className="flex items-center gap-1">
                  <Link to={`/teacher/exams/${exam.id}`} className="p-2 text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600 rounded-xl" title="Manage Exam">
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(exam.id)} className="p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 rounded-xl" title="Delete Exam">
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