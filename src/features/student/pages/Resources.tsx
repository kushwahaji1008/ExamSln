import React, { useState } from 'react';
import { Search, FileText, Download, ExternalLink, Paperclip } from 'lucide-react';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    { id: '1', title: 'React Hooks Cheat Sheet', course: 'Fullstack Bootcamp', type: 'pdf', size: '2.4 MB' },
    { id: '2', title: 'System Design Interview Prep', course: 'General', type: 'link', url: '#' },
    { id: '3', title: 'Lecture Notes: Big O Notation', course: 'Data Structures', type: 'doc', size: '1.1 MB' },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Study Resources</h1>
        <p className="mt-2 text-sm text-slate-400">Access all your downloadable materials and external links.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search resources..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {resources.map((res) => (
            <div key={res.id} className="flex items-center justify-between p-4 sm:p-6 hover:bg-slate-800/50 transition">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400 border border-white/5">
                  {res.type === 'link' ? <ExternalLink className="h-5 w-5" /> : <Paperclip className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">{res.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="rounded bg-slate-800 px-2 py-0.5">{res.course}</span>
                    {res.size && <span>{res.size}</span>}
                  </div>
                </div>
              </div>
              
              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-sky-500 hover:text-white transition">
                {res.type === 'link' ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}