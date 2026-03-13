import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShieldCheck } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import DashboardPM from './pages/DashboardPM';
import ClientList from './pages/ClientList';
import ClientDetails from './pages/ClientDetails';
import DashboardDesigner from './pages/DashboardDesigner';
import DashboardDeveloper from './pages/DashboardDeveloper';
import Team from './pages/Team';
import ProjectHistory from './pages/ProjectHistory';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPM />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/designer" element={<DashboardDesigner />} />
          <Route path="/developer" element={<DashboardDeveloper />} />
          <Route path="/team" element={<Team />} />
          <Route path="/history" element={<ProjectHistory />} />
          
          {/* Default Redirection */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Fallback */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafafa] dark:bg-slate-950 text-slate-950 dark:text-white p-10 text-center">
              <div className="size-24 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary mb-8 animate-pulse">
                <ShieldCheck className="size-12 stroke-[2.5]" />
              </div>
              <h1 className="text-8xl font-black tracking-tighter italic uppercase mb-4">404_VOID</h1>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Target Node Does Not Exist Within This Reality.</p>
              <a href="/login" className="h-16 px-12 bg-slate-950 dark:bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:scale-105 transition-all">
                RETURN TO HUB
              </a>
            </div>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
