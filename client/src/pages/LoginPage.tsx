import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Cpu, Database, Fingerprint, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import api from '../lib/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect based on role
      if (user.role === 'PM') navigate('/dashboard');
      else if (user.role === 'DESIGNER') navigate('/designer');
      else if (user.role === 'DEVELOPER') navigate('/developer');
      else navigate('/dashboard');
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'AUTHORIZATION_DENIED: Invalid Credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 flex flex-col font-display text-slate-950 dark:text-slate-50 antialiased relative overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Glow Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[140px]"></div>
      </div>

      {/* Top Header - Technical Breadcrumb */}
      <header className="relative z-10 flex items-center justify-between px-8 lg:px-16 py-8">
        <div className="flex items-center gap-4">
          <div className="size-10 bg-slate-950 dark:bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/20 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <ShieldCheck className="size-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-slate-950 dark:text-white text-lg font-black tracking-tighter uppercase leading-none">RDN_HUB</h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Signal_Secure_v4.2</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-4">
             <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Intelligence Network</span>
          </div>
          <button className="h-12 px-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 hover:border-primary transition-all rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Cpu className="size-4 text-primary" />
            Security_Node
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[480px]">
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl border-2 border-slate-100 dark:border-slate-800/50 rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] p-12 lg:p-16 relative overflow-hidden">
            {/* Top Right Icon */}
            <div className="absolute -top-6 -right-6 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
               <Fingerprint className="size-48" />
            </div>

            <div className="flex flex-col mb-12 relative z-10">
              <div className="inline-flex items-center gap-2 mb-6">
                 <div className="size-2 rounded-full bg-primary animate-pulse" />
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Auth Protocol</span>
              </div>
              <h1 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter uppercase mb-3 leading-none italic">
                Central_Access
              </h1>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] leading-relaxed">
                Reputation Defense Network <br/>Authorized Personnel Only.
              </p>
            </div>

            {error && (
              <div className="mb-10 p-5 bg-rose-500/10 border-2 border-rose-500/20 rounded-2xl text-rose-500 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-4 flex items-center gap-3">
                <div className="size-2 rounded-full bg-rose-500" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transmission_Channel</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-18 pl-16 pr-6 bg-slate-50 dark:bg-slate-950/50 border-2 border-slate-100 dark:border-slate-800/50 rounded-[24px] text-slate-950 dark:text-white text-sm font-black uppercase tracking-tight placeholder:text-slate-300 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    placeholder="RDN-AGENT-ID"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Encryption_Key</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-18 pl-16 pr-16 bg-slate-50 dark:bg-slate-950/50 border-2 border-slate-100 dark:border-slate-800/50 rounded-[24px] text-slate-950 dark:text-white text-sm font-black uppercase tracking-tight placeholder:text-slate-300 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full h-20 bg-slate-950 dark:bg-primary hover:bg-slate-900 dark:hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] rounded-[24px] shadow-2xl shadow-primary/20 transition-all transform active:scale-[0.96] flex items-center justify-center gap-4 text-xs italic",
                    isLoading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="size-6 animate-spin stroke-[3]" />
                  ) : (
                    <>
                      Execute_Login
                      <ChevronRight className="size-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col items-center gap-6 pt-10">
                <a href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
                  Lost Recovery Link?
                </a>
                <div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  New Operative? <a href="#" className="text-primary hover:underline decoration-2 underline-offset-8 transition-all">Apply for Access</a>
                </p>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-4 opacity-50">
               <Database className="size-4" />
               <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
               <ShieldCheck className="size-4" />
            </div>
            <p className="text-[9px] text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] font-black">
              STATION_SIGMA_AUTHORIZED_DEVICE
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-12 py-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-100 dark:border-slate-800 pt-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <p>© 2024 REPUTATION_DEFENSE_NETWORK. ALL_SYSTEMS_GO.</p>
          <div className="flex flex-wrap justify-center gap-12">
            <a href="#" className="hover:text-primary transition-colors">Protocols</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy_Layer</a>
            <a href="#" className="hover:text-primary transition-colors">Mission_Parameters</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
