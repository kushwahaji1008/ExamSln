import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Clock, Target, Calendar, ArrowRight, ShieldAlert, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import  apiClient  from '@/services/api/client';

interface Exam {
  id: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  scheduledStartTime: string;
  settings?: {
    requireProctoring: boolean;
  };
}

export default function StudentExams() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'my-exams' | 'available'>('my-exams');
  
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        setError(null);
        // Toggle endpoint based on tab
        const endpoint = activeTab === 'my-exams' 
          ? '/exams' // Backend route for registered/upcoming exams for this student
          : '/exams';         // Backend route for all published exams
          
        const response = await apiClient.get(endpoint);
        setExams(response.data);
      } catch (err: any) {
        console.error("Failed to fetch exams:", err);
        setError(err.response?.data?.message || 'Failed to load exams.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [activeTab]);

  const handleRegister = async (examId: string) => {
    try {
      setRegisteringId(examId);
      // Backend route to register for an exam
      await apiClient.post(`/exams/${examId}/register`);
      alert("Successfully registered for exam!");
      setActiveTab('my-exams'); // Switch tab to show it
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setRegisteringId(null);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Open Schedule";
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' 
    }).format(new Date(dateString));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-12">
      <PageHeader title="Exam Center" subtitle="Manage your upcoming assessments and view available certifications." />

      {/* Tabs */}
      <div className="flex p-1 bg-slate-200/50 rounded-2xl w-fit mb-6">
        <button 
          onClick={() => setActiveTab('my-exams')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'my-exams' ? 'bg-card text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          My Exams
        </button>
        <button 
          onClick={() => setActiveTab('available')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'available' ? 'bg-card text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Available Exams
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading {activeTab === 'my-exams' ? 'your' : 'available'} exams...</p>
        </div>
      )}

      {!loading && error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-center font-bold">
          <AlertCircle className="w-6 h-6 mx-auto mb-2" /> {error}
        </div>
      )}

      {!loading && !error && exams.length === 0 && (
        <div className="text-center py-20 bg-card border border-slate-200 rounded-[2rem] text-slate-500">
          <Target className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">No exams found</h3>
          {activeTab === 'my-exams' ? (
            <button onClick={() => setActiveTab('available')} className="text-indigo-600 font-bold hover:underline">Register for an exam</button>
          ) : (
            <p>There are no exams available at the moment.</p>
          )}
        </div>
      )}

      {/* List Layout for My Exams, Grid layout for Available Exams */}
      {!loading && !error && exams.length > 0 && (
        <div className={activeTab === 'my-exams' ? "grid gap-4" : "grid sm:grid-cols-2 gap-6"}>
          
          {exams.map(exam => (
            <div key={exam.id} className={
              activeTab === 'my-exams' 
                ? "flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-card border border-slate-200 rounded-[1.5rem] shadow-sm hover:shadow-md transition"
                : "flex flex-col bg-card border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:-translate-y-1 transition duration-300"
            }>
              
              <div className={activeTab === 'available' ? "flex-1 mb-6" : ""}>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{exam.title}</h3>
                  {exam.settings?.requireProctoring && activeTab === 'my-exams' && (
                    <span className="bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-rose-100 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Proctored
                    </span>
                  )}
                </div>
                
                <div className={`text-sm text-slate-500 ${activeTab === 'available' ? 'space-y-2 mt-4' : 'flex items-center gap-4'}`}>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {formatDate(exam.scheduledStartTime)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {exam.durationMinutes} mins</span>
                  <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-slate-400" /> {exam.totalMarks} marks</span>
                </div>

                {exam.settings?.requireProctoring && activeTab === 'available' && (
                  <div className="flex items-center gap-2 text-sm text-rose-600 font-medium mt-4 p-2 bg-rose-50 rounded-lg">
                    <ShieldAlert className="w-4 h-4" /> Strictly Proctored
                  </div>
                )}
              </div>

              <div className={activeTab === 'available' ? "w-full" : "mt-4 sm:mt-0"}>
                {activeTab === 'my-exams' ? (
                  <Link to={`/student/exams/${exam.id}`} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-indigo-500/20 whitespace-nowrap">
                    Enter Lobby <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button 
                    onClick={() => handleRegister(exam.id)}
                    disabled={registeringId === exam.id}
                    className="w-full text-center bg-slate-900 hover:bg-slate-800 text-primary-foreground py-3 rounded-xl text-sm font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {registeringId === exam.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Register Now'}
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}