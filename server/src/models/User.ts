import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'PM' | 'DESIGNER' | 'DEVELOPER' | 'BOTH';
  isActive: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  role: { type: String, enum: ['PM', 'DESIGNER', 'DEVELOPER', 'BOTH'], required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
