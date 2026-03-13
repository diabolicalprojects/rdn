import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, Mail, Eye, EyeOff, ChevronRight, Loader2, Info, LayoutDashboard } from 'lucide-react';
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
      setError(err.response?.data?.message || 'Access Denied: Invalid Credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased flex flex-col relative overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <ShieldAlert className="size-5" />
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">RDN</h2>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Contact Support</a>
            <a href="#" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Security Center</a>
          </nav>
          <button className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
            <LayoutDashboard className="size-4" />
            Enterprise Portal
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[460px]">
          {/* Login Card */}
          <div className="bg-white/80 dark:bg-card-dark/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-2xl p-8 lg:p-10">
            {/* Logo & Heading */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Lock className="size-7" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Reputation Defense Network Management</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium flex items-center gap-3">
                <Info className="size-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2",
                    isLoading && "opacity-70 cursor-not-allowed transform-none"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Footer Links */}
              <div className="flex flex-col items-center gap-4 pt-4">
                <a href="#" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
                  Forgot Password?
                </a>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
                <p className="text-sm text-slate-500 dark:text-slate-500 text-center">
                  Don't have an account? <a href="#" className="text-primary font-semibold hover:underline">Request Access</a>
                </p>
              </div>
            </form>
          </div>

          {/* Support Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest font-bold">
              Secured by RDN Cryptography Standard
            </p>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© 2024 Reputation Defense Network. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;

