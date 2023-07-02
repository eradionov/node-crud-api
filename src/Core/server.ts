import { findRoute, getParametersBag } from './route_utils';
import * as http from 'http';
import { HTTP_GET } from './request';
import {
    CONTENT_TYPE_JSON,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
} from './response';

export const createServer = (port: number) => {
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

                    return;
                }

                route.handler(
                    { request: req },
                    { response: res },
                    await getParametersBag(route, req),
                );
            } catch (error: any) {
                console.error(error);

                res.writeHead(HTTP_INTERNAL_SERVER_ERROR, CONTENT_TYPE_JSON);
                res.end('Internal server error');
            }
        },
    );

    server.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
};
