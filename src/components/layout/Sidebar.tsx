import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, FileText, BarChart3, Video, 
  Calendar, FolderDown, LogOut, User as UserIcon, Shield, 
  HelpCircle, Users, Activity, Settings, Sparkles, X
} from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Generate navigation links strictly based on role: 0=Student, 1=Teacher, 2=Admin, 3=SuperAdmin
  const getNavLinks = () => {
    const role = user?.role;
    
    if (role === 0 || role === 'Student') {
      return [
        { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
        { name: 'My Courses', path: '/student/courses', icon: BookOpen },
        { name: 'All Exams', path: '/student/exams', icon: FileText },
        { name: 'Results', path: '/student/results', icon: BarChart3 },
        { name: 'Live Classes', path: '/student/live', icon: Video },
        { name: 'Schedule', path: '/student/schedule', icon: Calendar },
        { name: 'Resources', path: '/student/resources', icon: FolderDown },
        { name: 'All Courses', path: '/student/courses', icon: BookOpen },
        { name: 'Exams', path: '/student/exams', icon: FileText },
        { name: 'Results', path: '/student/results', icon: BarChart3 },
        { name: 'Live Classes', path: '/student/live', icon: Video },
        { name: 'Schedule', path: '/student/schedule', icon: Calendar },
        { name: 'Resources', path: '/student/resources', icon: FolderDown },
      ];
    }
    
    if (role === 1 || role === 'Teacher') {
      return [
        { name: 'Dashboard', path: '/teacher', icon: LayoutDashboard },
        { name: 'My Exams', path: '/teacher/exams', icon: FileText },
        { name: 'Question Bank', path: '/teacher/questions', icon: HelpCircle },
        { name: 'Live Classes', path: '/teacher/live', icon: Video },
        { name: 'Results & Grading', path: '/teacher/results', icon: BarChart3 },
        { name: 'My Courses', path: '/student/courses', icon: BookOpen },
        { name: 'Exams', path: '/student/exams', icon: FileText },
        { name: 'Results', path: '/student/results', icon: BarChart3 },
        { name: 'Live Classes', path: '/student/live', icon: Video },
        { name: 'Schedule', path: '/student/schedule', icon: Calendar },
        { name: 'Resources', path: '/student/resources', icon: FolderDown },

      ];
    }
    
    if (role === 2 || role === 'Admin' || role === 3 || role === 'SuperAdmin') {
      return [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'System Health', path: '/admin/health', icon: Activity },
        { name: 'Content Review', path: '/admin/content', icon: Shield },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
        { name: 'My Courses', path: '/student/courses', icon: BookOpen },
        { name: 'Exams', path: '/student/exams', icon: FileText },
        { name: 'Results', path: '/student/results', icon: BarChart3 },
        { name: 'Live Classes', path: '/student/live', icon: Video },
        { name: 'Schedule', path: '/student/schedule', icon: Calendar },
        { name: 'Resources', path: '/student/resources', icon: FolderDown },
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-slate-950/95 backdrop-blur-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Area */}
        <div className="flex h-20 shrink-0 items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 shadow-lg shadow-sky-500/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">ExamSolution</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
          <div className="space-y-1.5">
            <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Main Menu
            </div>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} // Close on mobile click
                end={link.path === '/student' || link.path === '/teacher' || link.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 hover:border-transparent border border-transparent'
                  }`
                }
              >
                <link.icon className="h-5 w-5 shrink-0" />
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom Actions (Profile & Logout) */}
        <div className="shrink-0 border-t border-white/5 p-4 space-y-1.5">
          <NavLink
            to="/profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 hover:border-transparent border border-transparent'
              }`
            }
          >
            <UserIcon className="h-5 w-5 shrink-0" />
            My Profile
          </NavLink>
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-400 transition-all duration-200 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}