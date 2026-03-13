import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  action: string;
  module: string;
  details: string;
  userId: mongoose.Types.ObjectId;
}

const logSchema = new Schema<ILog>({
  action: { type: String, required: true },
  module: { type: String, required: true },
  details: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Log || mongoose.model<ILog>('Log', logSchema);
