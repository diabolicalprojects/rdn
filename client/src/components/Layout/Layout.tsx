import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background Decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
           <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/3 rounded-full blur-[120px]"></div>
        </div>
        
        <Header />
        <main className="flex-1 overflow-y-auto p-6 relative z-10 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
