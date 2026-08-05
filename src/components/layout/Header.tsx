import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';
import { Link } from 'react-router-dom';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const { user } = useAuth();
  
  // Calculate initials for the avatar
  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase())
        .slice(0, 2)
        .join('')
    : 'U';

  return (
    <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between border-b border-white/5 bg-slate-950/80 px-4 sm:px-6 lg:px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Global Search (Optional Placeholder) */}
        <div className="hidden sm:flex relative w-64 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search courses, exams..." 
            className="w-full rounded-full border border-slate-800 bg-slate-900/50 pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Notifications */}
        <Link 
          to="/notifications" 
          className="relative rounded-full p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-rose-500" />
        </Link>

        <div className="h-8 w-px bg-slate-800 hidden sm:block" />

        {/* Profile Avatar & Name */}
        <Link to="/profile" className="flex items-center gap-3 transition hover:opacity-80">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-bold text-white leading-none">{user?.fullName}</span>
            <span className="text-xs font-medium text-slate-500 mt-1 capitalize">
              Role: {user?.role === 0 ? 'Student' : user?.role === 1 ? 'Teacher' : 'Admin'}
            </span>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-sky-500/20">
            {initials}
          </div>
        </Link>
      </div>
    </header>
  );
}