import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Clock, HelpCircle, Calendar, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function StudentExams() {
  const [activeTab, setActiveTab] = useState<'my-exams' | 'available'>('my-exams');

  const myExams = [
    { id: 'e1', title: 'Computer Science Midterm', date: 'Oct 15, 2026', time: '10:00 AM', status: 'Upcoming' },
    { id: 'e2', title: 'Data Structures Quiz 1', date: 'Oct 01, 2026', time: 'Completed', status: 'Graded', score: '85/100' },
  ];

  const availableExams = [
    { id: 'e3', title: 'Python Certification', duration: '120 mins', marks: 100, proctored: true },
    { id: 'e4', title: 'Database Systems Final', duration: '90 mins', marks: 50, proctored: false },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      <PageHeader title="Exam Center" subtitle="Manage your upcoming assessments and view available certifications." />

      {/* Tabs */}
      <div className="flex p-1 bg-slate-200/50 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('my-exams')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'my-exams' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          My Exams
        </button>
        <button 
          onClick={() => setActiveTab('available')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'available' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Available Exams
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'my-exams' ? (
        <div className="grid gap-4">
          {myExams.map(exam => (
            <div key={exam.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{exam.title}</h3>
                  {exam.status === 'Upcoming' && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-200">Upcoming</span>}
                  {exam.status === 'Graded' && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-200">Completed</span>}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {exam.date}</span>
                  {exam.status === 'Graded' ? (
                    <span className="font-bold text-slate-700">Score: {exam.score}</span>
                  ) : (
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {exam.time}</span>
                  )}
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                {exam.status === 'Upcoming' ? (
                  <Link to={`/student/exams/${exam.id}`} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-indigo-500/20">
                    Enter Lobby <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold transition">
                    View Results
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {availableExams.map(exam => (
            <div key={exam.id} className="flex flex-col bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:-translate-y-1 transition duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-4">{exam.title}</h3>
              
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" /> Duration: <span className="font-semibold">{exam.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <HelpCircle className="w-4 h-4 text-slate-400" /> Total Marks: <span className="font-semibold">{exam.marks}</span>
                </div>
                {exam.proctored && (
                  <div className="flex items-center gap-2 text-sm text-rose-600 font-medium mt-2">
                    <ShieldAlert className="w-4 h-4" /> Strictly Proctored
                  </div>
                )}
              </div>

              <Link to={`/student/exams/${exam.id}`} className="text-center w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-bold transition">
                Register / Enroll
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}