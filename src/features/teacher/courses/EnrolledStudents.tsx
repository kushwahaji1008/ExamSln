
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { Search, Download, User, CheckCircle2 } from 'lucide-react';

export default function EnrolledStudents() {
  const { id } = useParams();
  const [search, setSearch] = useState('');

  // Mock student data
  const students = [
    { id: 's1', name: 'Alex Johnson', email: 'alex@example.com', enrolledDate: 'Aug 10, 2026', progress: 85, avgScore: '92%' },
    { id: 's2', name: 'Maria Garcia', email: 'maria@example.com', enrolledDate: 'Aug 12, 2026', progress: 40, avgScore: '78%' },
    { id: 's3', name: 'James Smith', email: 'james@example.com', enrolledDate: 'Aug 15, 2026', progress: 100, avgScore: '88%' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-12">
      <PageHeader title="Course Roster" subtitle="Monitor student progress and performance for this course." />

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-[1.5rem] border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-sm font-bold transition w-full sm:w-auto">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-card border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4 pl-6">Student</th>
                <th className="p-4">Enrolled Date</th>
                <th className="p-4">Course Progress</th>
                <th className="p-4">Exam Average</th>
                <th className="p-4 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{student.name}</div>
                        <div className="text-xs text-slate-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 font-medium">{student.enrolledDate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3 w-48">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${student.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-8">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-900">{student.avgScore}</td>
                  <td className="p-4 pr-6 text-right">
                    {student.progress === 100 ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                        In Progress
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}