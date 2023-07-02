import {createServer} from "./src/Core/server";
import './src/Controller/User';
import * as dotenv from 'dotenv'
import {startCluster} from "./src/cluster";
import {availableParallelism} from "node:os";

try {
    dotenv.config();
    const multiplier = 1000;

    let port = parseInt(process.env.PORT || '0');
    const isMulti = (process.argv[2] ?? null) === 'multi';

    if (port <= 0) {
        throw new Error('Port is not defined');
    }

    if (isMulti) {
        const cpus = availableParallelism();
        startCluster(cpus, multiplier * cpus);
    } else {
        createServer(port);
    }
} catch (error) {
    console.error(error);
}