import redisClient from '../config/redisClient.js';

export const enqueueTask = async (userId) => {
    try {
        await redisClient.rPush(`taskQueue:${userId}`, userId);
    } catch (error) {
        console.error('Error adding task to queue:', error);
    }
};

export const dequeueTask = async (userId) => {
    try {
        const task = await redisClient.lPop(`taskQueue:${userId}`);
        return task;
    } catch (error) {
        console.error('Error processing task from queue:', error);
    }
};
