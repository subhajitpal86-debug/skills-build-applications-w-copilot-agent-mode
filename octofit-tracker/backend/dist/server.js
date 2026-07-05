"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '0.0.0.0';
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        baseUrl,
    });
});
app.use('/api', routes_1.default);
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, host, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Starting API without MongoDB connection');
    app.listen(port, host, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
});
