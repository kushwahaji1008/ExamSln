
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { PlusCircle, Save, X, Type, CheckCircle2, LayoutList } from 'lucide-react';

export default function AddQuestions() {
  const { examId } = useParams();
  
  const [question, setQuestion] = useState({
    text: '',
    type: 'MCQ',
    marks: 5,
    options: ['', '', '', ''],
    correctOptionIndex: 0
  });

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to save question
    alert('Question added successfully!');
    setQuestion({ text: '', type: 'MCQ', marks: 5, options: ['', '', '', ''], correctOptionIndex: 0 });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans pb-12">
      <PageHeader title="Add Questions" subtitle="Create new questions and add them to your exam." />

      <div className="flex gap-4 border-b border-slate-200 pb-4">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md">Create New</button>
        <button className="px-6 py-2 bg-white text-slate-600 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition">Select from Bank</button>
      </div>

      <form onSubmit={handleSave} className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Question Text</label>
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Marks</label>
              <input type="number" min="1" value={question.marks} onChange={(e) => setQuestion({...question, marks: Number(e.target.value)})} className="w-16 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-center outline-none focus:border-indigo-500" />
            </div>
          </div>
          <div className="relative">
            <Type className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
            <textarea
              required rows={4} placeholder="Type your question here..."
              value={question.text} onChange={(e) => setQuestion({ ...question, text: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <LayoutList className="w-4 h-4" /> Answer Options
          </label>
          <p className="text-xs text-slate-400 mb-2">Select the radio button next to the correct answer.</p>
          
          <div className="space-y-3">
            {question.options.map((opt, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-xl border transition ${question.correctOptionIndex === index ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-white'}`}>
                <input 
                  type="radio" name="correctAnswer" checked={question.correctOptionIndex === index}
                  onChange={() => setQuestion({ ...question, correctOptionIndex: index })}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300" 
                />
                <input
                  type="text" required placeholder={`Option ${index + 1}`} value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
                {question.correctOptionIndex === index && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-slate-100 pt-6">
          <Link to={`/teacher/exams/${examId || ''}`} className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-full transition">Cancel</Link>
          <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition">
            <PlusCircle className="w-4 h-4" /> Save & Add Another
          </button>
        </div>
      </form>
    </div>
  );
}