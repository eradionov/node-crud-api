import {Request} from "./request";
import {Response} from "./response";

export interface RouteDefinition {
    path: string;
    method: string;
    handler: Request & Response
}