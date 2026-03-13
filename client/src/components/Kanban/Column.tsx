import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { MoreHorizontal, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
// @ts-ignore
import ProjectCard from './ProjectCard';

interface ColumnProps {
  id: string;
  title: string;
  projects: any[];
}

const Column: React.FC<ColumnProps> = ({ id, title, projects }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5 px-1 text-slate-950 dark:text-white">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-black uppercase tracking-wider">{title}</h3>
          <span className="size-6 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black">
            {projects.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="group size-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
            <Plus className="size-4" />
          </button>
          <button className="size-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 flex flex-col gap-4 rounded-2xl transition-colors min-h-[500px] p-1",
          "bg-transparent"
        )}
      >
        <SortableContext
          id={id}
          items={projects.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SortableContext>
        
        {projects.length === 0 && (
          <div className="h-24 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800/30 flex flex-col items-center justify-center gap-2">
             <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                <Plus className="size-4 text-slate-300" />
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No Projects</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
