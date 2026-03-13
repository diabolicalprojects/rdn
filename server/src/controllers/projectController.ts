import type { Request, Response } from 'express';
import Project from '../models/Project.js';

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const DUMMY_PROJECTS = [
  { 
    _id: '1', 
    id: '1',
    title: 'RDN Corporate Build', 
    status: 'DESIGN', 
    clientId: '1', 
    clientName: 'Reputation Defense Network',
    priority: 'High',
    dueDate: 'In 2 days',
    designer: 'Sarah Chen'
  },
  { 
    _id: '2', 
    id: '2',
    title: 'Landing Page UI Kit', 
    status: 'DESIGN', 
    clientId: '1', 
    clientName: 'Internal Tooling',
    priority: 'Medium',
    dueDate: 'In 5 days',
    designer: 'Sarah Chen'
  },
  { 
    _id: '3', 
    id: '3',
    title: 'Global Asset Library', 
    status: 'DESIGN_REVIEW', 
    clientId: '1', 
    clientName: 'Reputation Defense Network',
    priority: 'High',
    dueDate: 'Tomorrow',
    designer: 'Sarah Chen'
  },
  { 
    _id: '4', 
    id: '4',
    title: 'API Endpoint Security', 
    status: 'DEVELOPMENT', 
    clientId: '1', 
    clientName: 'Security Infrastructure',
    priority: 'Critical',
    dueDate: 'Today',
    developer: 'Alex Rivera'
  },
  { 
    _id: '5', 
    id: '5',
    title: 'WordPress Plugin Sync', 
    status: 'DEVELOPMENT', 
    clientId: '2', 
    clientName: 'RDN CMS',
    priority: 'Medium',
    dueDate: 'Next week',
    developer: 'Alex Rivera'
  },
  { 
    _id: '6', 
    id: '6',
    title: 'Brand Identity Reset', 
    status: 'COMPLETED', 
    clientId: '1', 
    clientName: 'Reputation Defense Network',
    priority: 'Low',
    dueDate: 'Completed',
    designer: 'Sarah Chen'
  },
];

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const projects = await Project.find(query).populate('clientId', 'name');
    
    // Fallback dummy data if DB is empty
    if (projects.length === 0) {
      const dummy = DUMMY_PROJECTS;
      return res.json(status ? dummy.filter(p => p.status === status) : dummy);
    }
    
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id).populate('clientId');
    if (!project) {
      const dummy = DUMMY_PROJECTS.find(p => p._id === req.params.id || p.id === req.params.id);
      if (dummy) return res.json(dummy);
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error: any) {
    const dummy = DUMMY_PROJECTS.find(p => p._id === req.params.id || p.id === req.params.id);
    if (dummy) return res.json(dummy);
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProjectStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.status = status;
    await project.save();
    res.json(project);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
