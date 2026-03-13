import React from 'react';
import Layout from '../components/Layout/Layout';
import { 
  UserPlus, 
  Mail, 
  Shield, 
  MoreHorizontal,
  Loader2,
  Globe,
  Fingerprint,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

const Team: React.FC = () => {
  const { data: team, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const response = await api.get('/users');
      return response.data;
    }
  });

  if (isLoading) return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-6">
           <Loader2 className="size-12 text-primary animate-spin stroke-[3]" />
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Syncing Operatives...</p>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex items-end justify-between mb-16 border-b-2 border-slate-100 dark:border-slate-800 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="size-3 rounded-full bg-primary shadow-[0_0_10px_rgba(60,175,246,0.5)]" />
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Active Network</span>
            </div>
            <h2 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter uppercase mb-2">Personnel Registry</h2>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Authorized RDN Agents & Tactical Operatives</p>
          </div>
          <button className="h-16 px-10 bg-slate-950 dark:bg-primary text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 group">
            <UserPlus className="size-4 group-hover:rotate-12 transition-transform" />
            Recruit Operative
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {team?.map((member: any) => (
            <div key={member._id} className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[40px] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center">
               <div className="absolute top-0 right-0 p-8">
                 <button className="text-slate-300 hover:text-primary dark:hover:text-white transition-all transform hover:rotate-90">
                   <MoreHorizontal className="size-6" />
                 </button>
               </div>

               <div className="relative mb-8">
                  <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className={cn(
                    "size-24 rounded-[32px] flex items-center justify-center text-2xl font-black border-4 border-white dark:border-slate-800 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10 text-white",
                    member.role === 'PM' ? 'bg-slate-950 dark:bg-primary' : member.role === 'DESIGNER' ? 'bg-indigo-600' : 'bg-slate-800'
                  )}>
                    {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 size-8 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-lg z-20">
                     <Fingerprint className="size-4 text-primary" />
                  </div>
               </div>
               
               <div className="mb-8 w-full">
                  <h3 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors mb-2">{member.name}</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">
                     <Shield className="size-3" />
                     {member.role === 'PM' ? 'Director of Operations' : member.role === 'DESIGNER' ? 'Creative Strategist' : 'Tactical Engineer'}
                  </div>
               </div>

               <div className="w-full space-y-3 mb-10">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border-2 border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all cursor-pointer group/item">
                    <Mail className="size-4 text-slate-400 group-hover/item:text-primary transition-colors" />
                    <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border-2 border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all cursor-pointer group/item">
                    <Globe className="size-4 text-slate-400 group-hover/item:text-primary transition-colors" />
                    <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter truncate">STATION_042_RDN</span>
                  </div>
               </div>

               <div className="w-full pt-8 border-t-2 border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className={cn(
                       "size-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]",
                       member.isActive ? 'bg-emerald-500 shadow-emerald-500/40 animate-pulse' : 'bg-rose-500 shadow-rose-500/40'
                     )}></div>
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{member.isActive ? 'Signal Clear' : 'Signal Lost'}</span>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-slate-950 dark:hover:text-white transition-all flex items-center gap-2 group/btn">
                    Profile
                    <ChevronRight className="size-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          ))}

          {/* New Slot Placeholder */}
          <div className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[40px] flex flex-col items-center justify-center p-10 hover:border-primary/30 transition-all group cursor-pointer min-h-[400px]">
             <div className="size-16 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plus className="size-8 text-slate-300 group-hover:text-primary transition-colors" />
             </div>
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] group-hover:text-primary transition-colors">Assign New Slot</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
