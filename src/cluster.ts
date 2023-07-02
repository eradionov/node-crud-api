import cluster from "node:cluster";
import {createServer} from "./Core/server";
import './storage';

export function startCluster(cpus: number, port: number) {
    if (cluster.isPrimary) {
        console.log(`Primary ${process.pid} is running`);

        for (let i = 0; i < cpus; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, _, _2) => {
            console.log(`worker ${worker.process.pid} died`);
            // Restart the worker
            cluster.fork();
        });

        createServer(port);
    }

    if (cluster.isWorker) {
        const workerPort = port + cluster.worker!.id;

        createServer(workerPort);

        console.log(`Worker ${process.pid} started on port ${workerPort}`);
    }
}