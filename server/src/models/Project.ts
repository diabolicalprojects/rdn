import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  clientId: mongoose.Types.ObjectId;
  clientName: string;
  status: 'DESIGN' | 'DESIGN_REVIEW' | 'DEVELOPMENT' | 'INTERNAL_REVIEW' | 'COMPLETED';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate: string;
  designer: string;
  developer: string;
  description: string;
  figmaLink?: string;
  driveLink?: string;
  credentials?: {
    cms?: string;
    hosting?: string;
    other?: string;
  };
  sop?: string[];
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  clientName: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['DESIGN', 'DESIGN_REVIEW', 'DEVELOPMENT', 'INTERNAL_REVIEW', 'COMPLETED'], 
    default: 'DESIGN' 
  },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  dueDate: { type: String },
  designer: { type: String },
  developer: { type: String },
  description: { type: String },
  figmaLink: { type: String },
  driveLink: { type: String },
  credentials: {
    cms: { type: String },
    hosting: { type: String },
    other: { type: String }
  },
  sop: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
