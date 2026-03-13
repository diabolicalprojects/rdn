import React from 'react';
import Layout from '../components/Layout/Layout';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Plus, 
  ExternalLink, 
  Clock,
  CheckCircle2,
  Globe,
  Database,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';

const PROJECTS_DUMMY = [
  { id: '1', title: 'Corporate Website v2', status: 'DEVELOPMENT', date: 'Mar 10, 2024', designer: 'Sarah Chen' },
  { id: '2', title: 'Landing Page Optimization', status: 'COMPLETED', date: 'Feb 28, 2024', designer: 'Sarah Chen' },
  { id: '3', title: 'SEO Dashboard Implementation', status: 'NEW', date: 'Mar 12, 2024', designer: null },
];

const ClientDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id: _id } = useParams();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DEVELOPMENT': return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20';
      case 'COMPLETED': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20';
      case 'NEW': return 'text-slate-500 bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20';
    }
  };

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-right duration-1000 h-full flex flex-col">
        <div className="flex items-center justify-between mb-12">
           <button 
             onClick={() => navigate('/clients')}
             className="flex items-center gap-3 text-slate-400 hover:text-primary transition-all text-[10px] font-black uppercase tracking-[0.2em] group"
           >
             <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
             Return to Global Registry
           </button>
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                 INTELLIGENCE NODE: 042-X
              </span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1">
          {/* Left Column: Client Intelligence */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[40px] p-10 relative overflow-hidden shadow-sm">
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                  <Database className="size-48" />
               </div>
               
               <div className="size-24 rounded-[32px] bg-slate-950 dark:bg-primary flex items-center justify-center text-white font-black text-4xl mb-8 shadow-2xl shadow-primary/20">
                 R
               </div>
               
               <div className="mb-10">
                  <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter uppercase mb-2">Reputation Defense Network</h1>
                  <p className="text-xs font-black text-primary uppercase tracking-[0.3em] italic">Established Strategic Partner</p>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center gap-5 p-5 rounded-[24px] bg-slate-50 dark:bg-slate-950/40 border-2 border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group cursor-pointer">
                    <div className="size-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                       <Mail className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60">Primary Signal</p>
                      <p className="text-[13px] font-black text-slate-950 dark:text-white uppercase tracking-tight">intelligence@rdn.corp</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 rounded-[24px] bg-slate-50 dark:bg-slate-950/40 border-2 border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group cursor-pointer">
                    <div className="size-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                       <Phone className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60">Direct Frequency</p>
                      <p className="text-[13px] font-black text-slate-950 dark:text-white uppercase tracking-tight">+1.800.RDN.INTEL</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 rounded-[24px] bg-slate-50 dark:bg-slate-950/40 border-2 border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group cursor-pointer">
                    <div className="size-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                       <Globe className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60">HQ Coordinates</p>
                      <p className="text-[13px] font-black text-slate-950 dark:text-white uppercase tracking-tight">SILICON_VALLEY_STATION</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-slate-950 text-white rounded-[40px] p-10 relative overflow-hidden group shadow-2xl shadow-primary/10">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <Lock className="size-20" />
               </div>
               <div className="relative z-10">
                  <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <div className="size-2 rounded-full bg-primary animate-pulse" />
                    Strategic Directives
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-bold uppercase tracking-widest mb-8 italic">
                    "Maintain absolute dominance in reputation sectors. Design must reflect technical supremacy. Zero tolerance for signal noise."
                  </p>
                  <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2 group">
                    INTERROGATE PROTOCOLS
                    <ChevronRight className="size-3 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          </div>

          {/* Right Column: Mission Deployment & History */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[40px] overflow-hidden shadow-sm">
               <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
                 <div>
                   <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter uppercase mb-1">Production Log</h2>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Historical & Active Deployment Nodes</p>
                 </div>
                 <button className="h-14 px-8 bg-slate-950 dark:bg-primary text-white rounded-[22px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                   <Plus className="size-4 stroke-[3]" />
                   Initialize New Unit
                 </button>
               </div>

               <div className="divide-y divide-slate-100 dark:divide-slate-800">
                 {PROJECTS_DUMMY.map(project => (
                   <div key={project.id} className="p-8 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-all group cursor-pointer">
                     <div className="flex items-center gap-6">
                       <div className={cn(
                         "size-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 group-hover:rotate-[360deg]",
                         project.status === 'COMPLETED' 
                          ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20" 
                          : "text-primary bg-primary/10 border-primary/10"
                       )}>
                         {project.status === 'COMPLETED' ? <CheckCircle2 className="size-6" /> : <Clock className="size-6" />}
                       </div>
                       <div>
                         <h4 className="text-lg font-black text-slate-950 dark:text-white uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">{project.title}</h4>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            {project.date} <span className="opacity-30">•</span> LEAD: {project.designer ? project.designer.toUpperCase() : 'AUTO_ASSIGN'}
                         </p>
                       </div>
                     </div>
                     <div className="flex items-center gap-6">
                       <span className={cn(
                         "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm",
                         getStatusColor(project.status)
                       )}>
                         {project.status.replace('_', ' ')}
                       </span>
                       <button className="size-11 rounded-xl flex items-center justify-center text-slate-400 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:text-primary hover:border-primary transition-all shadow-sm">
                         <ExternalLink className="size-5" />
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 border-2 border-dashed border-primary/30 rounded-[40px] p-12 flex items-center justify-between group">
               <div className="max-w-xl">
                 <h3 className="text-2xl font-black text-primary uppercase tracking-tighter mb-4">Neural Kickoff Protocol</h3>
                 <p className="text-[13px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                   ENGAGE INSTANT DEPLOYMENT FOR RDN SUBSIDIARY. AUTOMATIC REPLICATION OF PREVIOUS MISSION PARAMETERS AND TEAM ASSIGNMENT.
                 </p>
               </div>
               <button className="h-16 px-10 bg-primary text-white rounded-[24px] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 transition-all hover:scale-110 active:scale-95 group-hover:rotate-1">
                 ACTIVATE SIGMA
               </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDetails;
