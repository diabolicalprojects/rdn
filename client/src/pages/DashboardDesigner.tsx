import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { 
  ExternalLink, 
  Send, 
  FolderOpen,
  AlertCircle,
  Figma,
  Loader2,
  Sparkles,
  Trello,
  Layers,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

const DashboardDesigner: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [figmaLink, setFigmaLink] = useState('');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', 'DESIGN'],
    queryFn: async () => {
      const response = await api.get('/projects?status=DESIGN');
      return response.data;
    }
  });

  useEffect(() => {
    if (projects?.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

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
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-1">
              Creative Lab
            </h1>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] opacity-70">
              Visual Identity & UI/UX Design System
            </p>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">active creative queue</p>
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="size-7 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-950 shadow-sm" />
                    ))}
                 </div>
                 <p className="text-lg font-black text-primary tracking-tight">{projects?.length || 0} UNITS</p>
              </div>
            </div>
            <div className="size-14 rounded-2xl bg-slate-950 dark:bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/20">
              <Sparkles className="size-6 stroke-[3]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Project List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Design Stream</h3>
               <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md">RENDER READY</span>
            </div>
            <div className="space-y-4">
              {projects?.map((project: any) => (
                <button 
                  key={project._id || project.id}
                  onClick={() => setSelectedProject(project)}
                   className={cn(
                     "w-full p-6 rounded-3xl border-2 transition-all group relative text-left outline-none overflow-hidden",
                     (selectedProject?._id === project._id || selectedProject?.id === project.id) 
                      ? "bg-white dark:bg-slate-900 border-primary shadow-2xl shadow-primary/5" 
                      : "bg-slate-100 dark:bg-slate-900/40 border-transparent hover:bg-white dark:hover:bg-slate-800"
                   )}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                       <h4 className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">{project.title}</h4>
                       <span className={cn(
                         "text-[10px] font-black px-3 py-1 rounded-xl uppercase tracking-widest border",
                         project.dueDate === 'Overdue' 
                          ? "bg-rose-500/10 text-rose-500 border-rose-500/20" 
                          : "bg-slate-200 dark:bg-slate-800 text-slate-500 border-transparent"
                       )}>
                         {project.dueDate || 'Soon'}
                       </span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">{project.clientName || project.client}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "size-2 rounded-full",
                          project.priority === 'Critical' ? "bg-rose-500 animate-pulse" : "bg-primary"
                        )}></div>
                        <span className="text-[10px] font-black text-slate-950 dark:text-slate-400 uppercase tracking-widest">{project.priority || 'Medium'} PRIORITY</span>
                      </div>
                      <Trello className="size-4 text-slate-200 dark:text-slate-800" />
                    </div>
                  </div>
                  {(selectedProject?._id === project._id || selectedProject?.id === project.id) && (
                    <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/5 rounded-full blur-2xl" />
                  )}
                </button>
              ))}
              {projects?.length === 0 && (
                 <div className="p-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl opacity-50">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Zero Active Signals</p>
                 </div>
              )}
            </div>
          </div>

          {/* Project Detail & Submission */}
          <div className="lg:col-span-8 space-y-10">
            {selectedProject ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[40px] shadow-2xl overflow-hidden relative">
                 <div className="h-2 bg-primary w-full" />
                 
                 <div className="p-12 relative">
                   <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                     <Figma className="size-64" />
                   </div>

                   <div className="relative z-10">
                     <div className="flex items-center justify-between mb-12">
                       <div className="flex items-center gap-6">
                         <div className="size-16 rounded-[22px] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                           <FolderOpen className="size-8 stroke-[2]" />
                         </div>
                         <div>
                           <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Current Assignment</p>
                           <h3 className="text-3xl font-black tracking-tighter uppercase">{selectedProject.title}</h3>
                         </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Platform</p>
                          <p className="text-sm font-black text-slate-950 dark:text-white uppercase">WP Infrastructure</p>
                       </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                       <a 
                         href={selectedProject.driveLink || '#'} 
                         target="_blank" 
                         className="flex items-center justify-between p-8 rounded-[32px] bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 hover:border-primary transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5"
                       >
                         <div className="flex items-center gap-5">
                            <div className="size-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                               <Layers className="size-6 text-blue-500" />
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Asset Repository</p>
                               <span className="text-sm font-black uppercase">Project Drive</span>
                            </div>
                         </div>
                         <ExternalLink className="size-5 text-slate-300 group-hover:text-primary transition-colors" />
                       </a>
                       
                       <div className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 group transition-all hover:border-amber-500/30">
                         <div className="flex items-center gap-5">
                            <div className="size-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 group-hover:rotate-12 transition-transform">
                               <AlertCircle className="size-6 text-amber-500" />
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Compliance</p>
                               <span className="text-sm font-black uppercase">Brand Protocol Ready</span>
                            </div>
                         </div>
                       </div>
                     </div>

                     <div className="bg-slate-950 dark:bg-slate-800/20 p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-10">
                          <Zap className="size-20 text-primary" />
                       </div>
                       
                       <label className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                         <Figma className="size-5 text-purple-400" />
                         Transmission: Figma Manifest URL
                       </label>
                       
                       <div className="flex gap-4">
                         <div className="relative flex-1">
                           <input 
                             type="text" 
                             placeholder="HTTPS://WWW.FIGMA.COM/FILE/MANIFEST_ID" 
                             value={figmaLink}
                             onChange={(e) => setFigmaLink(e.target.value)}
                             className="w-full h-16 px-6 bg-white/5 border border-white/10 rounded-2xl text-[13px] font-bold text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary outline-none transition-all uppercase tracking-widest"
                           />
                         </div>
                         <button className="h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 transition-all flex items-center gap-3 active:scale-95 group">
                           <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                           Signal Submission
                         </button>
                       </div>
                       <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mt-6 text-center">
                         Finalizing submission will migrate node to DESIGN_REVIEW protocol.
                       </p>
                     </div>
                   </div>
                 </div>
              </div>
            ) : (
              <div className="h-[500px] flex flex-col items-center justify-center bg-slate-100/50 dark:bg-slate-900/40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[50px] opacity-60">
                <div className="size-24 rounded-[32px] bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-8">
                  <Sparkles className="size-10 text-slate-400" />
                </div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.4em]">Initialize Connection</p>
              </div>
            )}

            <div className="bg-slate-950 text-white rounded-[40px] p-12 relative overflow-hidden shadow-2xl group cursor-pointer hover:shadow-primary/10 transition-all">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
               
               <div className="relative z-10 flex items-center justify-between">
                 <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-2 rounded-full bg-primary animate-pulse" />
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Corporate Mandate</p>
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter uppercase mb-3 italic">Standard Design Infrastructure</h3>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                      Always deploy authorized RDN token systems for all creative output. 
                      Consistency is the core of our visual intelligence.
                    </p>
                 </div>
                 <button className="h-14 px-10 bg-white text-slate-950 rounded-[20px] text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-xl">
                   Access UI Kit
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardDesigner;
