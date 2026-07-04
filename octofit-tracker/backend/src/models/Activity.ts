import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  date: string;
  distance?: number;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String, required: true },
  distance: { type: Number },
}, { timestamps: true });

export default mongoose.model<IActivity>('Activity', activitySchema);
