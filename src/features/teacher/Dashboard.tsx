import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Users, TrendingUp, Plus, PlayCircle } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

export default function TeacherDashboard() {
  const stats = [
    { label: 'Total Courses', value: '12', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Published Exams', value: '8', icon: FileText, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Active Students', value: '1,248', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Completion Rate', value: '84%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      <PageHeader title="Teacher Dashboard" subtitle="Welcome back! Here's an overview of your teaching metrics." />

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Courses</h2>
            <Link to="/teacher/courses" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">View all</Link>
          </div>
          
          <div className="rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Introduction to Computer Science</h3>
                    <p className="text-sm text-slate-500">Updated 2 days ago • 4 Modules</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200">
                  Published
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link to="/teacher/courses/create" className="flex items-center gap-3 p-4 rounded-[1.5rem] bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20">
              <div className="bg-white/20 p-2 rounded-xl"><BookOpen className="w-5 h-5" /></div>
              <span className="font-bold">Create New Course</span>
              <Plus className="w-4 h-4 ml-auto" />
            </Link>
            <Link to="/teacher/exams/create" className="flex items-center gap-3 p-4 rounded-[1.5rem] bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm">
              <div className="bg-slate-100 p-2 rounded-xl"><FileText className="w-5 h-5" /></div>
              <span className="font-bold">Create New Exam</span>
              <Plus className="w-4 h-4 ml-auto" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}