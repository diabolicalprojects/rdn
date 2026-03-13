import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { 
  Terminal, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Circle,
  Globe,
  Layout as LayoutIcon,
  Figma,
  Loader2,
  Lock,
  Server,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

const DashboardDeveloper: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showPass, setShowPass] = useState(false);
  const [sop, setSop] = useState<any[]>([]);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', 'DEVELOPMENT'],
    queryFn: async () => {
      const response = await api.get('/projects?status=DEVELOPMENT');
      return response.data;
    }
  });

  useEffect(() => {
    if (projects?.length > 0 && !selectedProject) {
      const first = projects[0];
      setSelectedProject(first);
      const initialSop = first.sop?.map((task: string) => ({ task, isCompleted: false })) || [];
      setSop(initialSop);
    }
  }, [projects, selectedProject]);

  const toggleTask = (index: number) => {
    const newSop = [...sop];
    newSop[index].isCompleted = !newSop[index].isCompleted;
    setSop(newSop);
  };

  const progress = sop.length > 0 ? Math.round((sop.filter(t => t.isCompleted).length / sop.length) * 100) : 0;

  if (isLoading) return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <Loader2 className="size-8 text-primary animate-spin" />
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-1000 text-slate-950 dark:text-white">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-1">
              Production Environment
            </h1>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] opacity-70">
              Technical Implementation & Deployment Console
            </p>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">active workloads</p>
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="size-7 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-950 shadow-sm" />
                    ))}
                 </div>
                 <p className="text-lg font-black text-primary tracking-tight">{projects?.length || 0}</p>
              </div>
            </div>
            <div className="size-14 rounded-2xl bg-slate-950 dark:bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/20">
              <Terminal className="size-6 stroke-[3]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Projects Sidebar */}
          <div className="lg:col-span-3 space-y-6">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Build Stream</h3>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md">LIVE</span>
             </div>
             <div className="space-y-3">
               {projects?.map((project: any) => (
                 <button 
                   key={project._id || project.id}
                   onClick={() => {
                     setSelectedProject(project);
                     const pSop = project.sop?.map((task: string) => ({ task, isCompleted: false })) || [];
                     setSop(pSop);
                   }}
                   className={cn(
                     "w-full p-5 rounded-2xl border-2 transition-all group relative text-left outline-none",
                     (selectedProject?._id === project._id || selectedProject?.id === project.id) 
                      ? "bg-white dark:bg-slate-900 border-primary shadow-xl shadow-primary/5" 
                      : "bg-slate-100 dark:bg-slate-900/40 border-transparent hover:bg-slate-200 dark:hover:bg-slate-800/50"
                   )}
                 >
                   <div className="flex items-center gap-4">
                     <div className={cn(
                       "size-10 rounded-xl flex items-center justify-center transition-all",
                       (selectedProject?._id === project._id || selectedProject?.id === project.id) 
                        ? "bg-primary text-white scale-110" 
                        : "bg-white dark:bg-slate-800 text-slate-400"
                     )}>
                        <LayoutIcon className="size-4 stroke-[3]" />
                     </div>
                     <div className="min-w-0">
                       <h4 className="text-[13px] font-black truncate mb-0.5">{project.title}</h4>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{project.clientName}</p>
                     </div>
                   </div>
                 </button>
               ))}
               {projects?.length === 0 && (
                 <p className="text-center text-xs font-black text-slate-400 uppercase p-10 opacity-50">Empty Queue</p>
               )}
             </div>
          </div>

          {/* Core Build Workspace */}
          <div className="lg:col-span-6 space-y-8">
            {selectedProject ? (
              <>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                  <div className="h-2 bg-primary w-full" />
                  
                  <div className="p-10">
                    <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-5">
                        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                          <Globe className="size-7 stroke-[2]" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Staging Environment</p>
                          <h3 className="text-2xl font-black tracking-tight">{selectedProject.title}</h3>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                         System Nominal
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 group transition-all hover:border-primary/30">
                         <div className="flex items-center justify-between mb-6">
                            <h4 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
                              <Lock className="size-4 text-primary" />
                              Secure Credential Hub
                            </h4>
                            <Zap className="size-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                         
                         <div className="grid grid-cols-1 gap-4">
                           <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
                             <div className="min-w-0">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Administrator Entry</p>
                               <p className="text-xs font-black">{selectedProject.credentials?.cms || "N/A"}</p>
                             </div>
                             <button className="text-primary hover:bg-primary/10 p-2.5 rounded-xl transition-all">
                               <ExternalLink className="size-4 stroke-[3]" />
                             </button>
                           </div>
                           <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
                             <div className="min-w-0">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">System Hash</p>
                               <p className="text-xs font-black tracking-[0.3em]">
                                 {showPass ? "RDN_SECRET_PASS_2024" : "••••••••••••••••"}
                               </p>
                             </div>
                             <button 
                               onClick={() => setShowPass(!showPass)}
                               className="text-slate-400 hover:text-primary hover:bg-primary/10 p-2.5 rounded-xl transition-all"
                             >
                               {showPass ? <EyeOff className="size-4 stroke-[3]" /> : <Eye className="size-4 stroke-[3]" />}
                             </button>
                           </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <a 
                          href={selectedProject.figmaLink || '#'} 
                          target="_blank" 
                          className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-all group shadow-sm hover:shadow-xl hover:shadow-purple-500/5"
                        >
                          <div className="size-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 group-hover:scale-110 transition-transform">
                            <Figma className="size-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Reference</p>
                            <p className="text-sm font-black truncate">Figma Canvas</p>
                          </div>
                        </a>
                        <a 
                          href={selectedProject.driveLink || '#'} 
                          target="_blank" 
                          className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all group shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
                        >
                          <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform">
                            <Server className="size-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Infrastructure</p>
                            <p className="text-sm font-black truncate">Storage Lab</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary hover:bg-primary/90 text-white p-8 rounded-3xl shadow-2xl shadow-primary/20 transition-all flex items-center justify-between group cursor-pointer hover:scale-[1.01] active:scale-[0.99]">
                   <div>
                     <h4 className="text-lg font-black tracking-tight mb-1 uppercase">Initialize Deployment Review</h4>
                     <p className="text-[11px] text-white/70 font-bold uppercase tracking-wider">Signals Intelligence will notify command.</p>
                   </div>
                   <div className="size-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all shadow-inner">
                     <CheckCircle2 className="size-6 stroke-[3]" />
                   </div>
                </div>
              </>
            ) : (
              <div className="h-[600px] flex flex-col items-center justify-center bg-slate-100/50 dark:bg-slate-900/40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px] opacity-60">
                <div className="size-20 rounded-3xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-6">
                  <Terminal className="size-8 text-slate-400" />
                </div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Awaiting Instruction</p>
              </div>
            )}
          </div>

          {/* SOP Checklist */}
          <div className="lg:col-span-3">
             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl h-full flex flex-col overflow-hidden">
               <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4">Operations Protocol</h3>
                 <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Efficiency Index</p>
                    <span className="text-[11px] font-black text-primary">{progress}%</span>
                 </div>
                 <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(60,175,246,0.5)]" style={{ width: `${progress}%` }}></div>
                 </div>
               </div>
               
               <div className="p-6 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                 {sop.map((item, idx) => (
                   <button 
                     key={idx}
                     onClick={() => toggleTask(idx)}
                     className={cn(
                       "w-full p-4 rounded-2xl border transition-all text-left flex items-start gap-4 group relative overflow-hidden",
                       item.isCompleted 
                        ? "bg-emerald-500/5 border-emerald-500/10" 
                        : "bg-slate-100/50 dark:bg-slate-800/30 border-transparent hover:border-primary/20"
                     )}
                   >
                     {item.isCompleted && <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />}
                     {item.isCompleted ? (
                       <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0 stroke-[3]" />
                     ) : (
                       <Circle className="size-5 text-slate-300 dark:text-slate-700 mt-0.5 shrink-0 stroke-[3] group-hover:text-primary transition-colors" />
                     )}
                     <span className={cn(
                       "text-[11px] font-black leading-tight tracking-tight mt-1 transition-colors uppercase",
                       item.isCompleted ? "text-emerald-700 dark:text-emerald-400 opacity-60 line-through" : "text-slate-950 dark:text-slate-300"
                     )}>
                       {item.task}
                     </span>
                   </button>
                 ))}
               </div>

               <div className="p-8 bg-slate-50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center leading-relaxed">
                    RDN INFRASTRUCTURE v4.2.0<br/>ENCRYPTED HANDSHAKE REQUIRED
                  </p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardDeveloper;
