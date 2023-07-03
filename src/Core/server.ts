import { findRoute, getParametersBag } from './route_utils';
import * as http from 'http';
import { HTTP_GET } from './request';
import { syncMultiClusterStorage, IClusterNotification } from '../storage';

import {
	CONTENT_TYPE_JSON,
	HTTP_INTERNAL_SERVER_ERROR,
	HTTP_NOT_FOUND,
} from './response';
import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';
import * as os from 'os';

export const createServer = (port: number, isMulti: boolean) => {
	if (!isMulti) {
		startServer(port);

		return;
	}

	const cpus = availableParallelism();
	const multiClusterPort =
  cpus * parseInt(process.env.CLUSTER_PORT_MULTIPLIER || '1000', 10);

	if (cluster.isPrimary) {
		for (let i = 0; i < cpus; i++) {
			const worker = cluster.fork();

			worker.on('message', function (message: IClusterNotification) {
				syncMultiClusterStorage(message);
			});
		}

		cluster.on('exit', (worker, _1, _2) => {
			console.log(`\x1b[33m worker ${worker} died. Restarting...  \x1b[0m`);

			const w = cluster.fork();

			w.on('message', function (message: IClusterNotification) {
				syncMultiClusterStorage(message);
			});
		});
	}

	if (cluster.isWorker) {
		process.on('message', (message: IClusterNotification) => {
			syncMultiClusterStorage(message);
		});
		startServer(multiClusterPort + cluster.worker?.id! - 1);
	}
};

const startServer = (port: number) => {
	const server = http.createServer(
		async (req: http.IncomingMessage, res: http.ServerResponse) => {
			try {
				const route = findRoute(
					req.url === undefined ? (process.env.HOME_URL as string) : req.url,
					req.method === undefined ? HTTP_GET : req.method,
				);

				if (route === undefined) {
					res.writeHead(HTTP_NOT_FOUND, CONTENT_TYPE_JSON);
					res.end('Not Found');
				} else {
					route.handler(
						{ request: req },
						{ response: res },
						await getParametersBag(route, req),
					);
				}
			} catch (error: any) {
				console.error(error);

				res.writeHead(HTTP_INTERNAL_SERVER_ERROR, CONTENT_TYPE_JSON);
				res.end('Internal server error');
			}
		},
	);

	server.listen(port, () => {
		console.log(`\x1b[33m listening on port ${port} \x1b[0m`);
	});

	server.on('uncaughtException', (_, response, _2, error) => {
		console.error(error);

		if (!response.headersSent) {
			return response.send(HTTP_INTERNAL_SERVER_ERROR, CONTENT_TYPE_JSON);
		}

		response.write(os.EOL);
		response.end();
	});
};
