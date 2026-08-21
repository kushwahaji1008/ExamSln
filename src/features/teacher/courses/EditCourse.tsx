import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Save, Image as ImageIcon, Type, AlignLeft } from 'lucide-react';

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', isPublished: false });

  useEffect(() => {
    // Mock fetch existing course metadata
    setFormData({ title: 'Complete Python Bootcamp 2026', description: 'Learn Python from scratch.', isPublished: true });
  }, [id]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans pb-12">
      <PageHeader title="Course Settings" subtitle="Update basic details and visibility." />

      <form className="rounded-[2rem] border border-slate-200 bg-card p-6 sm:p-10 shadow-sm space-y-8">
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Course Title</label>
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
              <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500 resize-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <p className="font-bold text-slate-900 text-sm">Publish Course</p>
            <p className="text-xs text-slate-500 mt-0.5">Make this course visible to students in the catalog.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({...formData, isPublished: e.target.checked})} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-border after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <div className="flex justify-end gap-4 border-t border-slate-100 pt-6">
          <Link to="/teacher/courses" className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-full transition">Cancel</Link>
          <button type="button" onClick={() => navigate('/teacher/courses')} className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-primary-foreground rounded-full text-sm font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition">
            <Save className="w-4 h-4" /> Update Course
          </button>
        </div>
      </form>
    </div>
  );
}