import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  projects: mongoose.Types.ObjectId[];
}

const clientSchema = new Schema<IClient>({
  companyName: { type: String, required: true },
  contactName: { type: String },
  email: { type: String },
  phone: { type: String },
  notes: { type: String },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model<IClient>('Client', clientSchema);
