import type { Request, Response } from 'express';
import Log from '../models/Log.js';

export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await Log.find().populate('userId', 'name').sort({ createdAt: -1 });
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLog = async (action: string, module: string, details: string, userId: string) => {
  try {
    const log = new Log({ action, module, details, userId });
    await log.save();
  } catch (error: any) {
    console.error('Failed to create log:', error.message);
  }
};
