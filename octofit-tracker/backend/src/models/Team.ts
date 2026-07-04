import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: number;
  sport: string;
  captain: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  members: { type: Number, required: true },
  sport: { type: String, required: true },
  captain: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ITeam>('Team', teamSchema);
