import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Type, AlignLeft, DollarSign, Loader2, ArrowRight, X } from 'lucide-react';
import apiClient  from '@/services/api/client';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state matching your exact C# Course schema
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 0, // Default category enum value
    level: 0,    // Default level enum value (e.g., Beginner)
    isFree: true,
    price: 0,
    isFeatured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // POST request to your backend
      const response = await apiClient.post('/api/videos/courses', formData);
      
      // Assuming your backend returns the created course object with an id
      const newCourseId = response.data.id; 

      // Redirect to the course builder to add chapters/videos
      navigate(`/teacher/courses/${newCourseId}/edit`);
    } catch (err: any) {
      console.error("Failed to create course:", err);
      setError(err.response?.data?.message || 'Failed to create course. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto font-sans pb-12">
      <PageHeader title="Create New Course" subtitle="Start by giving your course a title, pricing, and category." />

      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
        
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Title */}
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

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
          <div className="relative">
            <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
            <textarea
              rows={4} placeholder="What will students learn in this course?"
              value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>

        {/* Category & Level Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category Index</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white"
            >
              <option value={0}>Programming / Development</option>
              <option value={1}>Data Science</option>
              <option value={2}>Design</option>
              <option value={3}>Business</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Difficulty Level</label>
            <select
              value={formData.level}
              onChange={e => setFormData({ ...formData, level: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white"
            >
              <option value={0}>Beginner</option>
              <option value={1}>Intermediate</option>
              <option value={2}>Advanced</option>
              <option value={3}>All Levels</option>
            </select>
          </div>
        </div>

        {/* Pricing Option */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 text-sm">Free Course</p>
              <p className="text-xs text-slate-500">Check if this course is available to all students for free.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox" checked={formData.isFree}
                onChange={e => setFormData({ ...formData, isFree: e.target.checked, price: e.target.checked ? 0 : formData.price })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {!formData.isFree && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Price ($ USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number" min="1" step="0.01"
                  value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="mt-10 flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
          <Link to="/teacher/courses" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 transition">
            <X className="w-4 h-4" /> Cancel
          </Link>
          <button
            type="submit" disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:bg-indigo-500 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Save & Build Curriculum <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>

      </form>
    </div>
  );
}