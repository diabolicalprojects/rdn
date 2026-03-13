import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  History, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Palette,
  Code,
  PieChart
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['PM'] },
    { icon: Palette, label: 'Designer', path: '/designer', roles: ['DESIGNER', 'PM'] },
    { icon: Code, label: 'Developer', path: '/developer', roles: ['DEVELOPER', 'PM'] },
    { icon: Users, label: 'Clients', path: '/clients', roles: ['PM'] },
    { icon: Users, label: 'Team', path: '/team', roles: ['PM'] },
    { icon: History, label: 'History', path: '/history', roles: ['PM'] },
    { icon: Settings, label: 'Settings', path: '/settings', roles: ['PM', 'DESIGNER', 'DEVELOPER'] },
  ].filter(item => item.roles.includes(user.role));

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/50 flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="size-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">Reputation</h1>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Defense Network</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("size-5", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-6">
        {/* Storage Usage */}
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50">
          <div className="flex justify-between items-center mb-3">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Storage Usage</span>
             <PieChart className="size-3 text-slate-300" />
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-primary w-[62%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
          </div>
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">12.4 GB of 20 GB used</p>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 font-black text-sm">
            {user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user.name}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{user.role === 'PM' ? 'Project Lead' : user.role}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="size-9 rounded-lg flex items-center justify-center text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all border border-transparent hover:border-rose-500/20"
          >
            <LogOut className="size-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};


export default Sidebar;
