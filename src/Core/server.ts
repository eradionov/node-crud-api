// import * as http from "http";
import {findRoute, getParametersBag} from "./routes";
import * as http from "http";
import {HTTP_GET} from "./request";

export const createServer = (port: number) => {
    const server = http.createServer(
        async (req: http.IncomingMessage, res:http.ServerResponse) => {
            try {
                const route = findRoute(
                    req.url === undefined ? process.env.HOME_URL as string : req.url,
                    req.method === undefined ? HTTP_GET: req.method
                );

                if (route === undefined) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end('Not Found');

                    return;
                }

                route.handler({request: req}, {response: res}, await getParametersBag(route, req));
            } catch (error: any) {
                console.error(error);

                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end('Internal server error');
            }
        })

    server.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
};