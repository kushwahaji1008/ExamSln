import React from 'react';
import { PlayCircle, CheckCircle2, FileText, Lock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CourseDetails() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      
      {/* Course Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Complete Python Bootcamp 2026</h1>
          <p className="text-slate-500 mt-2">Learn Python from zero to hero. Includes web development, data science, and automation.</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 inline-flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Enrolled
          </div>
          <div className="mt-2 text-sm font-medium text-slate-500">45% Completed</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Side: Video Player Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="w-full aspect-video bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-white shadow-lg overflow-hidden relative">
            <PlayCircle className="w-16 h-16 text-white/50 mb-4 cursor-pointer hover:text-white hover:scale-110 transition-all" />
            <p className="font-medium">1. Introduction to Python</p>
            {/* Fake progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
              <div className="h-full bg-indigo-500 w-1/3"></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">About this lesson</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              In this introductory lesson, we will cover the basics of Python installation, setting up your environment, and writing your very first "Hello World" application. Make sure you download the attached PDF resources before proceeding to the quiz.
            </p>
          </div>
        </div>

        {/* Right Side: Syllabus / Modules */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 px-2">Course Content</h2>
          
          <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
            {/* Module 1 */}
            <div className="border-b border-slate-100 last:border-0">
              <div className="bg-slate-50 p-4 font-bold text-slate-800 text-sm">Module 1: Getting Started</div>
              <div className="p-2 space-y-1">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-indigo-50 text-indigo-700 text-left text-sm font-semibold">
                  <PlayCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="flex-1 truncate">1. Introduction to Python</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 text-left text-sm font-medium transition">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="flex-1 truncate">2. Installation Guide (PDF)</span>
                </button>
              </div>
            </div>

            {/* Module 2 */}
            <div className="border-b border-slate-100 last:border-0">
              <div className="bg-slate-50 p-4 font-bold text-slate-800 text-sm">Module 2: Core Concepts</div>
              <div className="p-2 space-y-1">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-400 text-left text-sm font-medium transition">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span className="flex-1 truncate">1. Variables and Data Types</span>
                </button>
              </div>
            </div>

            {/* Course Exam Link */}
            <div className="bg-indigo-600 p-5 mt-2 text-white">
              <div className="flex items-center gap-2 font-bold mb-2">
                <Award className="w-5 h-5 text-indigo-200" />
                Midterm Exam
              </div>
              <p className="text-indigo-200 text-xs mb-4">Complete all modules to unlock this exam.</p>
              <Link to="/student/exams/e123" className="block text-center w-full bg-white text-indigo-600 font-bold py-2 rounded-xl text-sm hover:bg-indigo-50 transition">
                View Exam Details
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}