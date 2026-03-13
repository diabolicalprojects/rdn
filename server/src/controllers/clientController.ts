import type { Request, Response } from 'express';
import Client from '../models/Client.js';

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const DUMMY_CLIENTS = [
  { _id: '1', companyName: 'Reputation Defense Network', contactName: 'John Doe', email: 'john@rdn.com', phone: '+1 555-0123', projects: 5 },
  { _id: '2', companyName: 'TechFlow Systems', contactName: 'Jane Smith', email: 'jane@techflow.io', phone: '+1 555-0124', projects: 2 },
  { _id: '3', companyName: 'Blue Horizon Media', contactName: 'Mike Johnson', email: 'mike@bluehorizon.com', phone: '+1 555-0125', projects: 12 },
];

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    if (clients.length === 0) return res.json(DUMMY_CLIENTS);
    res.json(clients);
  } catch (error: any) {
    console.warn("Falling back to dummy clients due to DB error:", error.message);
    res.json(DUMMY_CLIENTS);
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      const dummy = DUMMY_CLIENTS.find(c => c._id === req.params.id);
      if (dummy) return res.json(dummy);
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error: any) {
    const dummy = DUMMY_CLIENTS.find(c => c._id === req.params.id);
    if (dummy) return res.json(dummy);
    res.status(500).json({ message: error.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json({ message: 'Client deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
