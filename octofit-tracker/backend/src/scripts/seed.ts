import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Brooks', email: 'ava@example.com', role: 'runner', profileImage: 'https://example.com/ava.png' },
      { name: 'Noah Chen', email: 'noah@example.com', role: 'coach', profileImage: 'https://example.com/noah.png' },
      { name: 'Mina Patel', email: 'mina@example.com', role: 'cyclist', profileImage: 'https://example.com/mina.png' },
    ]);

    const teams = await Team.insertMany([
      { name: 'North Stars', members: 8, sport: 'Running', captain: users[0].name },
      { name: 'River Runners', members: 6, sport: 'Cycling', captain: users[2].name },
    ]);

    const activities = await Activity.insertMany([
      { userId: users[0]._id, type: 'run', duration: 30, date: '2026-07-01', distance: 5.2 },
      { userId: users[1]._id, type: 'workout', duration: 45, date: '2026-07-02', distance: 0 },
      { userId: users[2]._id, type: 'cycle', duration: 60, date: '2026-07-03', distance: 18.4 },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, points: 1200, rank: 1 },
      { userId: users[1]._id, points: 950, rank: 2 },
      { userId: users[2]._id, points: 1100, rank: 3 },
    ]);

    await Workout.insertMany([
      { name: 'HIIT Circuit', difficulty: 'intermediate', duration: 25, focus: 'cardio' },
      { name: 'Recovery Stretch', difficulty: 'easy', duration: 20, focus: 'mobility' },
      { name: 'Mountain Climbers', difficulty: 'advanced', duration: 15, focus: 'strength' },
    ]);

    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded activities:', activities.length);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
