import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Type, AlignLeft, Save, X, ArrowRight } from 'lucide-react';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to POST /api/courses
    const newCourseId = 'c123'; 
    // Redirect to the Course Builder to add videos/exams
    navigate(`/teacher/courses/${newCourseId}/edit`);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto font-sans">
      <PageHeader title="Create New Course" subtitle="Start by giving your course a name and description." />

      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Course Title *</label>
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text" required placeholder="e.g., Complete Python Bootcamp"
                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
              <textarea
                rows={5} placeholder="What will students learn?"
                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
          <Link to="/teacher/courses" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 transition">
            <X className="w-4 h-4" /> Cancel
          </Link>
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:bg-indigo-500 transition-all">
            Save & Build Curriculum <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}