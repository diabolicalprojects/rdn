import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import type {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import api from '../../lib/api';
// @ts-ignore
import Column from './Column';
// @ts-ignore
import ProjectCard from './ProjectCard';

const COLUMNS = [
  { id: 'DESIGN', title: 'Design' },
  { id: 'DESIGN_REVIEW', title: 'Design Review' },
  { id: 'DEVELOPMENT', title: 'Development' },
  { id: 'INTERNAL_REVIEW', title: 'Internal Review' },
  { id: 'COMPLETED', title: 'Completed' },
];

const Board: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeProject, setActiveProject] = useState<any>(null);
  const [columns, setColumns] = useState<Record<string, any[]>>({
    DESIGN: [],
    DESIGN_REVIEW: [],
    DEVELOPMENT: [],
    INTERNAL_REVIEW: [],
    COMPLETED: [],
  });

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/projects');
      return response.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await api.patch(`/projects/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  useEffect(() => {
    if (projectsData) {
      const grouped = projectsData.reduce((acc: any, project: any) => {
        const status = project.status || 'DESIGN';
        if (!acc[status]) acc[status] = [];
        acc[status].push({ ...project, id: project._id || project.id });
        return acc;
      }, {
        DESIGN: [],
        DESIGN_REVIEW: [],
        DEVELOPMENT: [],
        INTERNAL_REVIEW: [],
        COMPLETED: [],
      });
      setColumns(grouped);
    }
  }, [projectsData]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const project = active.data.current?.project;
    setActiveProject(project);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainer = active.data.current?.sortable?.containerId || active.data.current?.project?.status;
    const overContainer = over.data.current?.sortable?.containerId || over.id;

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setColumns((prev) => {
      const activeItems = prev[activeContainer] || [];
      const overItems = prev[overContainer] || [];

      const activeIndex = activeItems.findIndex((item) => item.id === activeId);
      const overIndex = overId in prev 
        ? overItems.length 
        : overItems.findIndex((item) => item.id === overId);

      if (activeIndex === -1) return prev;

      const movingItem = activeItems[activeIndex];
      const updatedMovingItem = { ...movingItem, status: overContainer };

      const newActiveItems = activeItems.filter((item) => item.id !== activeId);
      const newOverItems = [...overItems];
      newOverItems.splice(overIndex, 0, updatedMovingItem);

      return {
        ...prev,
        [activeContainer]: newActiveItems,
        [overContainer]: newOverItems,
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveProject(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    
    const activeContainer = active.data.current?.sortable?.containerId || active.data.current?.project?.status;
    const overContainer = over.data.current?.sortable?.containerId || (overId in columns ? overId : over.data.current?.project?.status);

    if (activeContainer && overContainer) {
      const activeIndex = columns[activeContainer]?.findIndex((item) => item.id === activeId);
      const overIndex = columns[overContainer]?.findIndex((item) => item.id === overId);

      if (activeContainer !== overContainer) {
        updateStatusMutation.mutate({ id: activeId as string, status: overContainer });
      } else if (activeIndex !== overIndex && activeIndex !== -1 && overIndex !== -1) {
        setColumns((prev) => ({
          ...prev,
          [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
        }));
      }
    }

    setActiveProject(null);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-96">
      <Loader2 className="size-8 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="h-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 h-full overflow-x-auto pb-8 snap-x scrollbar-hide">
          {COLUMNS.map((col) => (
            <div key={col.id} className="w-[320px] shrink-0 snap-center">
              <Column id={col.id} title={col.title} projects={columns[col.id] || []} />
            </div>
          ))}
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeProject ? (
            <ProjectCard project={activeProject} isOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Board;
