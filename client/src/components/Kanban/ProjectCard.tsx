import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, MessageSquare, GripVertical, MoreVertical, Layout, Cpu } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: any;
  isOverlay?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isOverlay }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: project.id,
    data: {
      type: 'item',
      project
    }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const priorityColors = {
    'Low': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    'Medium': 'bg-primary/10 text-primary border-primary/20',
    'High': 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-500/20',
    'Critical': 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border-rose-500/20',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] p-5 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/40 hover:-translate-y-1",
        isDragging && "opacity-0",
        isOverlay && "shadow-2xl ring-2 ring-primary border-primary rotate-1 z-50 cursor-grabbing backdrop-blur-3xl bg-white/90 dark:bg-slate-950/90"
      )}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-2">
           <span className={cn(
             "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border",
             priorityColors[project.priority as keyof typeof priorityColors] || priorityColors['Medium']
           )}>
             {project.priority || 'Medium'}
           </span>
           {project.status === 'DEVELOPMENT' && (
             <Cpu className="size-3.5 text-primary opacity-50" />
           )}
           {project.status === 'DESIGN' && (
             <Layout className="size-3.5 text-primary opacity-50" />
           )}
        </div>
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 dark:hover:text-slate-100 transition-colors p-1">
           <GripVertical className="size-4" />
        </div>
      </div>

      <h4 className="text-[16px] font-black text-slate-950 dark:text-white mb-1.5 leading-tight tracking-tight group-hover:text-primary transition-colors pr-6">
        {project.title}
      </h4>
      
      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mb-6">
        {project.clientName || 'RDN Internal'}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex -space-x-3">
          {project.designer && (
            <div className="size-8 rounded-full bg-slate-950 dark:bg-primary border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-md relative group/avatar" title={`Designer: ${project.designer}`}>
              {project.designer.split(' ').map((n: string) => n[0]).join('')}
              <div className="absolute -bottom-1 -right-1 size-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>
          )}
          {project.developer && (
            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-black text-slate-600 dark:text-slate-300 shadow-md relative group/avatar" title={`Developer: ${project.developer}`}>
              {project.developer.split(' ').map((n: string) => n[0]).join('')}
              <div className="absolute -bottom-1 -right-1 size-3 rounded-full bg-slate-400 border-2 border-white dark:border-slate-900" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 group/stat cursor-pointer">
            <MessageSquare className="size-3.5 group-hover/stat:text-primary transition-colors" />
            <span className="text-[10px] font-black group-hover/stat:text-primary transition-colors">4</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
            <Clock className="size-3.5" />
            <span className="text-[10px] font-black whitespace-nowrap uppercase tracking-tighter">12d</span>
          </div>
        </div>
      </div>
      
      <button className="absolute top-12 right-4 opacity-0 group-hover:opacity-100 transition-all size-8 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary">
        <MoreVertical className="size-5" />
      </button>

      {project.priority === 'Critical' && (
        <div className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border-2 border-white dark:border-slate-950"></span>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
