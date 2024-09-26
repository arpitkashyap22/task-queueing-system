import { RateLimiterRedis } from 'rate-limiter-flexible';
import redisClient from '../config/redisClient.js';

// Limiter for 1 request per second
const rateLimiterPerSecond = new RateLimiterRedis({
    storeClient: redisClient,
    points: 1,   // 1 request
    duration: 1, // per second
    keyPrefix: 'rateLimiterPerSecond'
});

// Limiter for 20 requests per minute
const rateLimiterPerMinute = new RateLimiterRedis({
    storeClient: redisClient,
    points: 20,   // 20 requests
    duration: 60, // per minute
    keyPrefix: 'rateLimiterPerMinute'
});

export const rateLimitMiddleware = async (req, res, next) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Consume 1 point from both limiters
        await rateLimiterPerSecond.consume(user_id, 1); // For 1 request per second
        await rateLimiterPerMinute.consume(user_id, 1); // For 20 requests per minute

        next();
    } catch (err) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
    }
};
