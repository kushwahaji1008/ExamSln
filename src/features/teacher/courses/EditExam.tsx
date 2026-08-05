import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Save, X, Clock, Target, Award, Type, AlignLeft } from 'lucide-react';

export default function EditExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', durationMinutes: 0, totalMarks: 0, passingMarks: 0 });

  useEffect(() => {
    // Mock fetch existing exam data
    setFormData({
      title: 'Midterm Computer Science 101',
      description: 'Covers chapters 1 through 5.',
      durationMinutes: 120,
      totalMarks: 100,
      passingMarks: 40
    });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/teacher/exams');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans pb-12">
      <PageHeader title="Edit Exam Settings" subtitle="Modify duration, scoring, and instructions." />

      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
        
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Basic Information</h3>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Exam Title</label>
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
              <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500 resize-none" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Grading & Timing</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Duration (Mins)</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="number" value={formData.durationMinutes} onChange={(e) => setFormData({...formData, durationMinutes: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Marks</label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="number" value={formData.totalMarks} onChange={(e) => setFormData({...formData, totalMarks: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Passing Marks</label>
              <div className="relative">
                <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="number" value={formData.passingMarks} onChange={(e) => setFormData({...formData, passingMarks: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-slate-100 pt-6">
          <Link to="/teacher/exams" className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-full transition">Cancel</Link>
          <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}