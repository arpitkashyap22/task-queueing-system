import fs from 'fs/promises';
import { enqueueTask } from '../services/taskQueue.js';
import path from 'path';

// Set up the log file path
const logFilePath = path.join(process.cwd(), 'src', 'logs', 'task.log');

// Ensure the log directory exists
await fs.mkdir(path.dirname(logFilePath), { recursive: true });

// Function to process and log the task
const processTask = async (userId) => {
    try {
        const taskLog = `${userId} - task completed at ${new Date().toISOString()}\n`;
        await fs.appendFile(logFilePath, taskLog);
        console.log(`${userId} - task logged`);
    } catch (error) {
        console.error('Error logging task:', error);
    }
};

// Function to handle the incoming task request
export const handleTaskRequest = async (req, res) => {
    const { user_id: userId } = req.body;

    // Validation for user_id
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Enqueue the task for the user
        await enqueueTask(userId);
        // Log the task completion
        await processTask(userId);
        res.status(202).json({ message: 'Task queued successfully' });
    } catch (error) {
        console.error('Error handling task request:', error);
        res.status(500).json({ error: 'Failed to queue task' });
    }
};
