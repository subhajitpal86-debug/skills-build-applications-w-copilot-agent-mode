import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  profileImage: { type: String },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
