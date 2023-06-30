import {RouteDefinition} from "./route_definition";

export class Server{
    private routes: RouteDefinition[];
    private constructor(routes: RouteDefinition[]) {
        this.routes = routes;
        console.log(this.routes);
    }
    public static doServe(routes: RouteDefinition[] = []) {
        const server = new Server(routes);
        console.log(server);
    }
}