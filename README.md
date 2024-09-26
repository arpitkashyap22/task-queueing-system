# Task Queuing System with Rate Limiting

## Project Overview

This project implements a **Node.js API cluster** with a **task queuing system** and **rate limiting**. The system enforces rate limits of:
- **1 task per second** per user
- **20 tasks per minute** per user

Tasks are queued if they exceed the rate limit and processed asynchronously. The system logs each task completion in a file, and the API is designed to be **resilient** and **scalable** by utilizing **Redis** for queueing and **cluster** for CPU core utilization.

## Features

- **Rate Limiting**: Limits the rate of tasks for each user based on predefined rules.
- **Task Queueing**: Queues requests that exceed the rate limit and processes them later.
- **Cluster Setup**: Distributes the workload across multiple CPU cores for scalability.
- **Logging**: Logs task completion (user ID and timestamp) to a file.
- **Error Handling**: Handles failures and edge cases gracefully.
- **Redis-Backed Queue**: Uses Redis to queue tasks and persist data.

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Minimal web framework for building APIs.
- **Redis**: In-memory data structure store used for task queueing.
- **Rate Limiter Flexible**: Rate limiting library with Redis as a store.
- **Cluster**: Node.js native module for clustering.

## Prerequisites

To run this project, you will need:

- **Node.js** (v14+ recommended)
- **Redis** (Running locally or via Docker)
- **npm** (Node Package Manager)

## Setup Instructions

### 1. Clone the repository

```bash
git clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables
Create a .env file in the root directory with the following:

```makefile
Copy code
REDIS_URL=redis://localhost:6379
PORT=3000
```

### 4. Set up Redis
You can either install Redis locally or use Docker to run Redis:

```bash
Copy code
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

### 5. Start the application
To start the application with clustering enabled:

```bash
Copy code
npm run dev
```
This will spin up two workers to handle requests concurrently.