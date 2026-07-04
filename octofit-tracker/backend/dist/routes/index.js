"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
router.get('/users', async (_req, res) => {
    const users = await User_1.default.find({});
    res.json(users);
});
router.post('/users', async (req, res) => {
    const user = await User_1.default.create(req.body);
    res.status(201).json(user);
});
router.get('/teams', async (_req, res) => {
    const teams = await Team_1.default.find({});
    res.json(teams);
});
router.post('/teams', async (req, res) => {
    const team = await Team_1.default.create(req.body);
    res.status(201).json(team);
});
router.get('/activities', async (_req, res) => {
    const activities = await Activity_1.default.find({});
    res.json(activities);
});
router.post('/activities', async (req, res) => {
    const activity = await Activity_1.default.create(req.body);
    res.status(201).json(activity);
});
router.get('/leaderboard', async (_req, res) => {
    const leaderboard = await LeaderboardEntry_1.default.find({}).populate('userId');
    res.json(leaderboard);
});
router.post('/leaderboard', async (req, res) => {
    const entry = await LeaderboardEntry_1.default.create(req.body);
    res.status(201).json(entry);
});
router.get('/workouts', async (_req, res) => {
    const workouts = await Workout_1.default.find({});
    res.json(workouts);
});
router.post('/workouts', async (req, res) => {
    const workout = await Workout_1.default.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
