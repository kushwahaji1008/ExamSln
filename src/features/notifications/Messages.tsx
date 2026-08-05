import React from 'react';
import { Search, Send, User } from 'lucide-react';

export default function Messages() {
  return (
    <div className="h-[calc(100vh-6rem)] max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6 font-sans">
      
      {/* Sidebar: Chat List */}
      <div className="w-full md:w-80 flex flex-col rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl overflow-hidden shrink-0">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search chats..." className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-sky-500" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {/* Active Chat Item */}
          <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-left">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0"><User className="w-5 h-5 text-slate-300" /></div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-sm font-bold text-white truncate">Prof. Sarah Jenkins</span>
                <span className="text-xs text-slate-500">10:42 AM</span>
              </div>
              <p className="text-xs text-sky-400 truncate">Your exam has been graded.</p>
            </div>
          </button>
          
          {/* Inactive Chat Item */}
          <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800/50 transition text-left">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0"><User className="w-5 h-5 text-slate-300" /></div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-sm font-bold text-slate-300 truncate">Support Team</span>
                <span className="text-xs text-slate-500">Yesterday</span>
              </div>
              <p className="text-xs text-slate-500 truncate">Ticket #1024 closed.</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center"><User className="w-5 h-5 text-slate-300" /></div>
          <div>
            <h2 className="text-sm font-bold text-white">Prof. Sarah Jenkins</h2>
            <p className="text-xs text-slate-400">Computer Science Dept.</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Incoming Message */}
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-slate-800 shrink-0"></div>
            <div>
              <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-sm text-sm text-slate-200">
                Hello! I've finished grading your midterm. Excellent work on the essay section.
              </div>
              <span className="text-xs text-slate-500 mt-1 ml-1">10:42 AM</span>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="flex gap-3 max-w-[80%] self-end ml-auto flex-row-reverse">
            <div className="bg-sky-500 p-3 rounded-2xl rounded-tr-sm text-sm text-white">
              Thank you so much, Professor! I really appreciate the feedback.
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-slate-950/50">
          <div className="flex items-center gap-3 relative">
            <input type="text" placeholder="Type your message..." className="flex-1 bg-slate-900 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white outline-none focus:border-sky-500" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-400 transition">
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}