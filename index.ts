import {createServer} from "./src/Core/server";
import './src/Controller/User';
import * as dotenv from 'dotenv'

try {
    dotenv.config();

    if (process.env.PORT === undefined || parseInt(process.env.PORT) <= 0) {
        throw new Error('Port is not defined');
    }

    createServer(parseInt(process.env.PORT!));
} catch (error) {
    console.error(error);
}