import express from 'express';
import dotenv from 'dotenv';
import { handleTaskRequest } from './controllers/taskController.js';
import { rateLimitMiddleware } from './middleware/rateLimiter.js';

dotenv.config();

export const createServer = () => {
    const app = express();
    app.use(express.json());

    // Task route
    app.post('/task', rateLimitMiddleware, handleTaskRequest);

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (PID: ${process.pid})`);
    });
};
