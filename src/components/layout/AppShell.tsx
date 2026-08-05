import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      
      {/* Sidebar Layout */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Layout */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Background ambient lighting for the whole app */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <Header setSidebarOpen={setSidebarOpen} />
        
        {/* Page Content Scroll Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}