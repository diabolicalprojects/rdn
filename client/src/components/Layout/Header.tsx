import React from 'react';
import { Bell, Search, Moon, Sun, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const getTitle = () => {
    switch(location.pathname) {
      case '/dashboard': return 'Project Management Dashboard';
      case '/clients': return 'Client Management';
      case '/projects': return 'Project Repository';
      case '/history': return 'Project History';
      default: return 'Production System';
    }
  };

  return (
    <header className="h-20 border-b border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 z-10 transition-all">
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {getTitle()}
          </h1>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">System Active</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects or clients..." 
            className="h-10 w-64 pl-10 pr-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-xs focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-6">
          <button className="size-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <Bell className="size-5" />
          </button>
          <button className="size-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <Moon className="size-5" />
          </button>
          
          <button className="h-10 px-5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 ml-2">
            <Plus className="size-4" />
            New Project
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
