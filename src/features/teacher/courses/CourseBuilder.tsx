import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { GripVertical, Plus, PlayCircle, FileText, Link as LinkIcon, Trash2, BookOpen, Loader2, AlertCircle, Save, CheckCircle2 } from 'lucide-react';
import  apiClient  from '@/services/api/client';

// Define the structures based on your C# models
interface CourseMaterial {
  id?: string;
  type: string;
  title: string;
  url?: string;
}

interface CourseModule {
  id?: string;
  title: string;
  materials: CourseMaterial[];
  examIds: string[];
}

interface Course {
  id: string;
  title: string;
  status: number;
  modules: CourseModule[];
}

export default function CourseBuilder() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state for creating a new module quickly
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [isAddingModule, setIsAddingModule] = useState(false);

  // 1. Fetch Course Data on Mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/courses/${courseId}`);
        
        // If modules is null from DB, initialize as empty array
        const fetchedCourse = response.data;
        if (!fetchedCourse.modules) fetchedCourse.modules = [];
        
        setCourse(fetchedCourse);
      } catch (err: any) {
        console.error("Failed to fetch course:", err);
        setError(err.response?.data?.message || 'Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  // 2. Handle Adding a New Module to the DB
  const handleAddModule = async () => {
    if (!newModuleTitle.trim() || !course) return;

    try {
      setIsSaving(true);
      const newModule: CourseModule = {
        id: crypto.randomUUID(), // Generate a temp ID or let backend handle it
        title: newModuleTitle,
        materials: [],
        examIds: []
      };

      // Hit the specific C# endpoint you created
      await apiClient.post(`/api/courses/${courseId}/modules`, newModule);
      
      // Update local UI state
      setCourse({
        ...course,
        modules: [...course.modules, newModule]
      });
      
      setNewModuleTitle('');
      setIsAddingModule(false);
    } catch (err) {
      alert("Failed to add module to the course.");
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Publish the Course
  const handlePublish = async () => {
    try {
      setIsSaving(true);
      // Assuming a standard PUT or PATCH for updating status
      await apiClient.put(`/api/courses/${courseId}`, { ...course, status: 1 });
      setCourse(prev => prev ? { ...prev, status: 1 } : null);
      alert("Course published successfully!");
    } catch (err) {
      alert("Failed to publish course.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-indigo-600">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading Course Builder...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 flex items-center gap-4">
        <AlertCircle className="w-8 h-8 shrink-0" />
        <div>
          <h3 className="font-bold text-lg">Error Loading Course</h3>
          <p>{error}</p>
          <Link to="/teacher/courses" className="mt-2 inline-block text-sm underline">Return to My Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-12">
      <PageHeader 
        title="Course Builder" 
        subtitle={`Designing curriculum for: ${course.title}`} 
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* --- LEFT SIDE: CURRICULUM BUILDER --- */}
        <div className="lg:col-span-8 space-y-6">
          
          {course.modules.length === 0 && !isAddingModule && (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-[2rem] bg-white">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">Curriculum is empty</h3>
              <p className="text-slate-500 mb-4">Start by adding your first chapter or module.</p>
            </div>
          )}

          {course.modules.map((mod, index) => (
            <div key={mod.id || index} className="rounded-[2rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
              
              {/* Module Header */}
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-slate-400 cursor-grab active:cursor-grabbing shrink-0" />
                <h4 className="font-bold text-slate-900 flex-1">{mod.title}</h4>
                <button className="text-slate-400 hover:text-rose-500 transition" title="Delete Chapter">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Materials & Exams List */}
              <div className="p-4 space-y-2">
                {mod.materials?.length === 0 && mod.examIds?.length === 0 && (
                  <p className="text-sm text-slate-400 italic py-2 text-center">No materials in this chapter yet.</p>
                )}

                {mod.materials?.map((mat, i) => (
                  <div key={mat.id || i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-slate-300 transition group">
                    <GripVertical className="w-4 h-4 text-slate-300" />
                    {mat.type === 'Video' ? <PlayCircle className="w-5 h-5 text-indigo-500" /> : <BookOpen className="w-5 h-5 text-sky-500" />}
                    <span className="text-sm font-medium text-slate-700 flex-1">{mat.title}</span>
                    <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}

                {/* Add Actions inside Module */}
                <div className="pt-4 flex flex-wrap gap-2 border-t border-slate-50 mt-2">
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100 transition">
                    <Plus className="w-3.5 h-3.5" /> Add Video / PDF
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold hover:bg-emerald-100 transition">
                    <LinkIcon className="w-3.5 h-3.5" /> Link Exam
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Module Input Area */}
          {isAddingModule ? (
            <div className="rounded-[2rem] border border-indigo-200 bg-indigo-50/50 p-6 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">New Chapter Title</label>
              <input 
                type="text" 
                autoFocus
                placeholder="e.g., Chapter 1: Introduction" 
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 mb-4"
              />
              <div className="flex gap-3">
                <button 
                  onClick={handleAddModule}
                  disabled={isSaving || !newModuleTitle.trim()}
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Chapter'}
                </button>
                <button 
                  onClick={() => setIsAddingModule(false)}
                  className="px-6 py-2 bg-white text-slate-600 text-sm font-bold rounded-xl border border-slate-200 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsAddingModule(true)} 
              className="w-full p-4 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add New Chapter
            </button>
          )}

        </div>

        {/* --- RIGHT SIDE: PUBLISH ACTIONS --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sticky top-8">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">Course Status</h3>
            
            {course.status === 1 ? (
              <div className="flex items-center gap-2 mb-6 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-sm font-bold">Published & Live</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-6 p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-700">
                <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
                <span className="text-sm font-bold">Draft Mode (Hidden)</span>
              </div>
            )}
            
            <button 
              onClick={handlePublish}
              disabled={isSaving || course.status === 1}
              className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 mb-3 disabled:opacity-50 disabled:shadow-none flex justify-center items-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : (course.status === 1 ? 'Already Published' : 'Publish Course')}
            </button>
            
            <Link to="/teacher/courses" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition">
              <Save className="w-4 h-4" /> Save & Exit
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}