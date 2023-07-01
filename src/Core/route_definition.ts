import {Request} from "./request";
import {Response} from "./response";

export type HandlerType = (request: Request, response: Response, params: Map<string, any>) => void;

export interface RouteDefinition {
    path: string;
    method: string;
    handler: HandlerType;
}