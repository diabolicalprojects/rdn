import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Search, UserPlus, Mail, Phone, Loader2, Building2, User, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: clients, isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await api.get('/clients');
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

  if (error) return (
    <Layout>
       <div className="max-w-2xl mx-auto mt-20 p-12 text-center bg-white dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px]">
         <div className="size-20 rounded-[28px] bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto mb-6">
            <UserPlus className="size-10" />
         </div>
         <h2 className="text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tighter mb-2">Signal Interrupted</h2>
         <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">Unable to establish connection with the client database.</p>
         <button onClick={() => window.location.reload()} className="h-12 px-8 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20">Retry Connection</button>
       </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-1 text-slate-950 dark:text-white">
              Client Registry
            </h1>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] opacity-70">
              Corporate Intelligence & Production Dynamics
            </p>
          </div>
          <button className="h-14 px-8 bg-slate-950 dark:bg-primary hover:bg-slate-900 dark:hover:bg-primary/90 text-white rounded-[22px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/10 transition-all flex items-center justify-center gap-3 group active:scale-95">
            <UserPlus className="size-4 group-hover:scale-110 transition-transform" />
            Integrate New Client
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
           <div className="lg:col-span-8 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="INTERROGATE DATABASE BY COMPANY OR CONTACT..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-16 w-full pl-16 pr-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] text-[13px] font-bold text-slate-950 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary outline-none transition-all uppercase tracking-widest shadow-sm"
              />
           </div>
           <div className="lg:col-span-4 self-center flex items-center gap-4">
              <div className="flex-1 h-16 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] px-6 flex items-center justify-between shadow-sm">
                 <div className="flex items-center gap-3">
                    <Filter className="size-4 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort Protocol</span>
                 </div>
                 <select className="bg-transparent text-[11px] font-black text-slate-950 dark:text-white uppercase tracking-widest outline-none border-none cursor-pointer">
                    <option>Alphabetical [A-Z]</option>
                    <option>Production Vol.</option>
                    <option>Recent Activity</option>
                 </select>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients?.filter((c: any) => c.companyName.toLowerCase().includes(searchTerm.toLowerCase())).map((client: any) => (
            <div 
              key={client._id} 
              onClick={() => navigate(`/clients/${client._id}`)}
              className="group bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[40px] p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/40 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                 <Building2 className="size-32" />
              </div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="size-16 rounded-[22px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary border border-slate-200 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                   <Building2 className="size-7" />
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 uppercase tracking-widest">Active Partner</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors">{client.companyName}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID: CLIENT-{client._id.toString().slice(-6).toUpperCase()}</p>
              </div>

              <div className="space-y-4 mb-10">
                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 transition-colors group-hover:bg-white dark:group-hover:bg-transparent">
                    <div className="size-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800">
                       <User className="size-4 text-slate-400" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Primary Liaison</p>
                       <p className="text-xs font-black text-slate-950 dark:text-white uppercase">{client.contactName}</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                       <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          <span className="text-[10px] font-black text-slate-950 dark:text-white uppercase">Operational</span>
                       </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Projects</p>
                       <span className="text-[13px] font-black text-primary">0{client.projects || 0} UNITS</span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                 <div className="flex items-center gap-4">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                       <Mail className="size-4" />
                    </button>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                       <Phone className="size-4" />
                    </button>
                 </div>
                 <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    Database Profile
                    <ChevronRight className="size-4" />
                 </div>
              </div>
            </div>
          ))}
          
          {clients?.length === 0 && (
            <div className="col-span-full py-20 text-center border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[50px] opacity-50">
               <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Historical Silence: No Clients Detected</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ClientList;
