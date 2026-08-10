import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Type, AlignLeft, Clock, Target, Award, Shield, Settings, Loader2, ArrowRight, X } from 'lucide-react';
import  apiClient  from '@/services/api/client';

export default function CreateExam() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state matching your exact C# Exam creation schema
  const [formData, setFormData] = useState({
    courseId: '', // Ideally, you'd fetch the teacher's courses and populate a dropdown here
    title: '',
    description: '',
    durationMinutes: 60,
    scheduledStartTime: '',
    type: 0,
    questionIds: [],
    settings: {
      randomizeQuestions: true,
      allowReview: true,
      showResultsImmediately: false,
      enableNegativeMarking: false,
      negativeMarkingPercentage: 0,
      requireProctoring: false,
      preventTabSwitch: true,
      enableAutoSubmit: true,
      gracePeriodMinutes: 5
    },
    totalMarks: 100,
    passingMarks: 40,
    allowedStudents: [],
    instructionsHtml: ''
  });

  const handleSettingChange = (key: keyof typeof formData.settings, value: any) => {
    setFormData({
      ...formData,
      settings: { ...formData.settings, [key]: value }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Format the date properly for the C# backend before sending
      const payload = {
        ...formData,
        scheduledStartTime: formData.scheduledStartTime ? new Date(formData.scheduledStartTime).toISOString() : new Date().toISOString()
      };

      // POST request to your Exam backend endpoint
      const response = await apiClient.post('/api/exams', payload);
      
      const newExamId = response.data.id; 

      // Redirect to the question adder or exam builder
      navigate(`/teacher/exams/${newExamId}`);
    } catch (err: any) {
      console.error("Failed to create exam:", err);
      setError(err.response?.data?.message || 'Failed to create the exam. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans pb-12">
      <PageHeader title="Create New Exam" subtitle="Configure assessment rules, grading, and proctoring settings." />

      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
        
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-sm font-medium">
            {error}
          </div>
        )}

        {/* --- BASIC INFO --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Basic Information</h3>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Exam Title *</label>
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text" required placeholder="e.g., Midterm Assessment"
                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
              <textarea
                rows={3} placeholder="Brief summary of the exam contents..."
                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500 focus:bg-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* --- GRADING & TIMING --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Grading & Schedule</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Marks</label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number" required min="1"
                  value={formData.totalMarks} onChange={e => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Passing Marks</label>
              <div className="relative">
                <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number" required min="1"
                  value={formData.passingMarks} onChange={e => setFormData({ ...formData, passingMarks: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Duration (Minutes)</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number" required min="1"
                  value={formData.durationMinutes} onChange={e => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Scheduled Start Time</label>
              <input
                type="datetime-local" required
                value={formData.scheduledStartTime} onChange={e => setFormData({ ...formData, scheduledStartTime: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* --- SECURITY & PROCTORING SETTINGS --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" /> Advanced Settings
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Proctoring Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <p className="font-bold text-slate-900 text-sm">Require Proctoring</p>
                <p className="text-xs text-slate-500 mt-0.5">Enable webcam & screen monitoring</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={formData.settings.requireProctoring} onChange={e => handleSettingChange('requireProctoring', e.target.checked)} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Tab Switching Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <p className="font-bold text-slate-900 text-sm">Prevent Tab Switch</p>
                <p className="text-xs text-slate-500 mt-0.5">Warn/end exam if student leaves tab</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={formData.settings.preventTabSwitch} onChange={e => handleSettingChange('preventTabSwitch', e.target.checked)} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Negative Marking Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 sm:col-span-2">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm">Negative Marking</p>
                <p className="text-xs text-slate-500 mt-0.5">Deduct marks for incorrect answers</p>
              </div>
              
              <div className="flex items-center gap-4">
                {formData.settings.enableNegativeMarking && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Penalty %</span>
                    <input 
                      type="number" min="0" max="100" 
                      value={formData.settings.negativeMarkingPercentage} 
                      onChange={e => handleSettingChange('negativeMarkingPercentage', Number(e.target.value))}
                      className="w-16 rounded-md border border-slate-200 px-2 py-1 text-sm outline-none focus:border-indigo-500 text-center"
                    />
                  </div>
                )}
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" className="sr-only peer" checked={formData.settings.enableNegativeMarking} onChange={e => handleSettingChange('enableNegativeMarking', e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Submit Actions */}
        <div className="mt-10 flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
          <Link to="/teacher/exams" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 transition">
            <X className="w-4 h-4" /> Cancel
          </Link>
          <button
            type="submit" disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:bg-indigo-500 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Exam & Add Questions <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>

      </form>
    </div>
  );
}