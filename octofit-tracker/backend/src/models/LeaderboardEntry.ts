import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
