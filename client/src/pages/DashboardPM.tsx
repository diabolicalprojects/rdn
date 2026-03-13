import React from 'react';
import Layout from '../components/Layout/Layout';
// @ts-ignore
import Board from '../components/Kanban/Board';
import { Filter, SortAsc, LayoutGrid, List, Search, Plus, Calendar, Database, Zap } from 'lucide-react';

const DashboardPM: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col h-full max-w-[1700px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Header Section */}
        <div className="mb-12 border-b-2 border-slate-100 dark:border-slate-800 pb-10">
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-4">
                 <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(60,175,246,0.5)]" />
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Ops Control Center</span>
              </div>
              <h1 className="text-6xl font-black text-slate-950 dark:text-white tracking-tighter mb-1 uppercase italic">
                RDN Project Hub
              </h1>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] opacity-80">
                Strategic Intelligence & Design Operations
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden xl:flex items-center gap-12 mr-12">
                  <div className="text-right group cursor-pointer">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors flex items-center justify-end gap-2">
                      <Zap className="size-3" />
                      Velocity
                    </p>
                    <p className="text-2xl font-black text-emerald-500 tracking-tighter uppercase italic">84.2%</p>
                  </div>
                  <div className="text-right group cursor-pointer">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors flex items-center justify-end gap-2">
                      <Database className="size-3" />
                      Active Units
                    </p>
                    <p className="text-2xl font-black text-primary tracking-tighter uppercase italic">12 SECURE</p>
                  </div>
               </div>
              <button className="h-16 px-10 bg-slate-950 dark:bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center gap-4 group">
                <Plus className="size-5 stroke-[4] group-hover:rotate-90 transition-transform duration-500" />
                Initialize Project
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Actions/Filters */}
        <div className="flex flex-wrap items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-slate-400 stroke-[3] group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="INTERROGATE_DATABASE..."
                className="h-16 w-[440px] pl-16 pr-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] text-[11px] font-black uppercase tracking-widest placeholder:text-slate-400/50 focus:border-primary focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm outline-none"
              />
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-900/50 rounded-[24px] p-2 border-2 border-slate-100 dark:border-slate-800">
              <button className="px-8 py-3 bg-white dark:bg-slate-800 text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/5 flex items-center gap-3">
                <LayoutGrid className="size-4 stroke-[3]" />
                Grid_View
              </button>
              <button className="px-8 py-3 text-slate-400 hover:text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all">
                <List className="size-4 stroke-[3]" />
                List_View
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="h-16 px-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[24px] text-[10px] font-black text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary transition-all flex items-center gap-4 uppercase tracking-[0.2em] shadow-sm">
               <Calendar className="size-4 stroke-[3]" />
               Sync_Timeline
             </button>
             <div className="w-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-full mx-2"></div>
             <button className="h-16 px-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[24px] text-[10px] font-black text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary transition-all flex items-center gap-4 uppercase tracking-[0.2em] group shadow-sm">
               <Filter className="size-4 stroke-[3] group-hover:rotate-180 transition-transform duration-500" />
               Parameters
             </button>
             <button className="h-16 px-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[24px] text-[10px] font-black text-slate-400 hover:border-primary hover:text-primary transition-all flex items-center gap-4 uppercase tracking-[0.2em] shadow-sm">
               <SortAsc className="size-4 stroke-[3]" />
               Hierarchy
             </button>
          </div>
        </div>

        {/* Kanban Board Container */}
        <div className="flex-1 min-h-0 bg-slate-50/50 dark:bg-transparent rounded-[48px] border-2 border-dashed border-slate-200 dark:border-slate-800 p-8">
          <Board />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPM;
