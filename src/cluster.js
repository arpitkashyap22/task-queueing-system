import cluster from 'cluster';
import os from 'os';
import { createServer } from './app.js';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers for each CPU
    for (let i = 0; i < 2; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died, starting a new one...`);
        cluster.fork(); // Start a new worker on failure
    });
} else {
    createServer(); // Each worker starts an Express server
}
