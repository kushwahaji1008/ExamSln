import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { GripVertical, Plus, PlayCircle, FileText, Link as LinkIcon, Trash2, BookOpen } from 'lucide-react';

export default function CourseBuilder() {
  // Mocking the structure we created in C#
  const [modules, setModules] = useState([
    {
      id: 'm1',
      title: 'Chapter 1: Getting Started',
      materials: [
        { id: 'mat1', type: 'Video', title: 'Welcome to the Course' },
        { id: 'mat2', type: 'PDF', title: 'Course Syllabus' },
      ],
      exams: []
    }
  ]);

  const handleAddModule = () => {
    setModules([...modules, { id: Date.now().toString(), title: 'New Chapter', materials: [], exams: [] }]);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-12">
      <PageHeader title="Course Builder" subtitle="Design your curriculum. Add videos, PDFs, and link exams to chapters." />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Side: Curriculum Builder */}
        <div className="lg:col-span-8 space-y-6">
          
          {modules.map((mod, index) => (
            <div key={mod.id} className="rounded-[2rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
              {/* Module Header */}
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-slate-400 cursor-grab active:cursor-grabbing" />
                <input 
                  type="text" 
                  value={mod.title} 
                  onChange={(e) => {
                    const newMods = [...modules];
                    newMods[index].title = e.target.value;
                    setModules(newMods);
                  }}
                  className="bg-transparent font-bold text-slate-900 outline-none w-full border-b border-transparent focus:border-indigo-500 transition" 
                />
                <button className="text-slate-400 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button>
              </div>

              {/* Materials & Exams List */}
              <div className="p-4 space-y-2">
                {mod.materials.map(mat => (
                  <div key={mat.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-slate-300 transition group">
                    <GripVertical className="w-4 h-4 text-slate-300" />
                    {mat.type === 'Video' ? <PlayCircle className="w-5 h-5 text-indigo-500" /> : <BookOpen className="w-5 h-5 text-sky-500" />}
                    <span className="text-sm font-medium text-slate-700 flex-1">{mat.title}</span>
                    <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                
                {mod.exams.map((exam: any) => (
                  <div key={exam.id} className="flex items-center gap-3 p-3 rounded-xl border border-emerald-100 bg-emerald-50/30 group">
                    <GripVertical className="w-4 h-4 text-emerald-300" />
                    <FileText className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-900 flex-1">Exam: {exam.title}</span>
                    <button className="opacity-0 group-hover:opacity-100 text-emerald-600 hover:text-rose-500 transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}

                {/* Add Actions inside Module */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100 transition">
                    <Plus className="w-3.5 h-3.5" /> Video/PDF
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold hover:bg-emerald-100 transition">
                    <LinkIcon className="w-3.5 h-3.5" /> Link Exam
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button onClick={handleAddModule} className="w-full p-4 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Add New Chapter
          </button>
        </div>

        {/* Right Side: Publish Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sticky top-8">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">Course Status</h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-sm font-bold text-slate-600">Draft - Not visible to students</span>
            </div>
            
            <button className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 mb-3">
              Publish Course
            </button>
            <Link to="/teacher/courses" className="block text-center w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition">
              Save & Exit
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}