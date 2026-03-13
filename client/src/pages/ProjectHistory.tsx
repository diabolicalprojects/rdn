import React from 'react';
import Layout from '../components/Layout/Layout';
import { 
  Search, 
  Filter, 
  MoreVertical,
  Loader2,
  Activity,
  Zap,
  Cpu,
  Shield,
  History
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

const ProjectHistory: React.FC = () => {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const response = await api.get('/history');
      return response.data;
    }
  });

  if (isLoading) return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <Loader2 className="size-8 text-primary animate-spin" />
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-1 text-slate-950 dark:text-white">
              Operation History
            </h1>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] opacity-70">
              Historical Intelligence & Audit Dynamics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-14 px-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[22px] flex items-center gap-3">
               <Activity className="size-4 text-primary" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active nodes:</span>
               <span className="text-sm font-black text-primary">12 LIVE</span>
            </div>
            <button className="h-14 px-8 bg-slate-950 dark:bg-primary text-white rounded-[22px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/10 transition-all hover:scale-105 active:scale-95">
               Export Audit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
           <div className="lg:col-span-9 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="PROBE HISTORICAL LOGS BY MODULE, USER OR ACTION..." 
                className="h-16 w-full pl-16 pr-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] text-[13px] font-bold text-slate-950 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary outline-none transition-all uppercase tracking-widest shadow-sm"
              />
           </div>
           <div className="lg:col-span-3">
              <button className="h-16 w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] flex items-center justify-center gap-3 hover:border-primary transition-all group">
                 <Filter className="size-4 text-slate-400 group-hover:text-primary transition-colors" />
                 <span className="text-[11px] font-black text-slate-950 dark:text-white uppercase tracking-widest">Protocol Filter</span>
              </button>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[40px] shadow-sm overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Signal Source</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Auth Authority</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Intervention Type</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Metadata</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {logs?.map((item: any) => (
                  <tr key={item._id} className="group hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary border border-slate-200 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                          <History className="size-5" />
                        </div>
                        <span className="text-[13px] font-black text-slate-950 dark:text-white uppercase tracking-tight italic">{item.module}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="size-7 rounded-lg bg-slate-950 dark:bg-primary flex items-center justify-center text-white text-[9px] font-black">
                            {item.userId?.name?.[0] || 'S'}
                         </div>
                         <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">{item.userId?.name || 'SYSTEM_CORE'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white text-[10px] font-black rounded-lg uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                         {item.action}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block max-w-xs truncate group-hover:text-slate-600 transition-colors">{item.details}</span>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-[11px] font-black text-slate-950 dark:text-white uppercase">{new Date(item.createdAt).toLocaleDateString()}</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{new Date(item.createdAt).toLocaleTimeString()}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="size-10 rounded-xl text-slate-300 hover:text-primary hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                        <MoreVertical className="size-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
             <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Intelligence Records: {logs?.length || 0}</p>
             </div>
             <div className="flex gap-4">
                <button className="h-10 px-6 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-primary hover:text-primary transition-all active:scale-95">Previous Sig.</button>
                <button className="h-10 px-6 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-primary hover:text-primary transition-all active:scale-95">Next Sig.</button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-slate-950 text-white p-10 rounded-[40px] relative overflow-hidden group cursor-pointer shadow-2xl shadow-primary/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                 <Shield className="size-20 text-primary" />
              </div>
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Security Protocol</p>
                 <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Integrity Lock</h3>
                 <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Verified audit logs are immutable. Encrypted nodes only.</p>
              </div>
           </div>
           
           <div className="bg-primary text-white p-10 rounded-[40px] relative overflow-hidden group cursor-pointer shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-45 transition-transform duration-700">
                 <Zap className="size-20" />
              </div>
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-4">Performance Metrics</p>
                 <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Neural Velocity</h3>
                 <p className="text-[11px] text-white/80 font-bold uppercase tracking-widest leading-relaxed">Average intervention deployment speed: 42ms.</p>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-10 rounded-[40px] relative overflow-hidden group cursor-pointer shadow-sm">
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-90 transition-transform duration-700">
                 <Cpu className="size-20" />
              </div>
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Internal Systems</p>
                 <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-slate-950 dark:text-white">Core Diagnostics</h3>
                 <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">All cognitive modules operating at nominal parameters.</p>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectHistory;
