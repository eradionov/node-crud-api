import {createServer} from "./src/Core/server";
import './src/Controller/User';
import * as dotenv from 'dotenv'
import {startCluster} from "./src/cluster";

try {
    dotenv.config();

    let port = parseInt(process.env.PORT || '0');
    const isMulti = (process.argv[2] ?? null) === 'multi';

    if (port <= 0) {
        throw new Error('Port is not defined');
    }

    if (isMulti) {
        startCluster(port);
    } else {
        createServer(port);
    }
} catch (error) {
    console.error(error);
}