import './Controller/User';
import * as dotenv from 'dotenv';
import { createServer } from './Core/server';

try {
	dotenv.config();

	const port = parseInt(process.env.PORT || '0');
	const isMulti = (process.argv[2] ?? null) === 'multi';

	if (port <= 0) {
		throw new Error('Port is not defined');
	}

	createServer(port, isMulti);
} catch (error) {
	console.error(error);
}
