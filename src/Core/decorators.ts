import {HTTP_DELETE, HTTP_GET, HTTP_POST, HTTP_PUT, Request} from "./request";
import {routeMetadata} from "./route_metadata";
import {Response} from "./response";
import {routeHandlers} from "./routes";
import {Server} from "./server";

export function Controller(prefix: string = '') {
    return function <T extends { new (): {} }>(constructor: T) {
        const instance = new constructor();
        const methods: string[] = Object.getOwnPropertyNames(constructor.prototype);

        for (const method of methods) {
            if (method !== 'constructor') {
                // @ts-ignore
                const handler: Request&Response|null =  instance[method as any];

                if (handler instanceof Function) {
                    const metadata = routeMetadata.get(`${instance.constructor.name}_${method}`);

                    if (metadata) {
                        routeHandlers.push({
                            path: `/${prefix}/${metadata.path}`,
                            method: metadata.method,
                            handler,
                        });
                    }
                }
           }
        }

        Server.doServe(routeHandlers);

    }
}

export function Get(path: string) {
    return function(target: any, method: string, descriptor: PropertyDescriptor) {
        routeMetadata.set(`${target.constructor.name}_${method}`, {method: HTTP_GET, path, handler: descriptor.value});

        return descriptor;
    }
}

export function Post(path: string) {
    return function(target: any, method: string, descriptor: PropertyDescriptor) {

        routeMetadata.set(`${target.constructor.name}_${method}`, {method: HTTP_POST, path, handler: descriptor.value});

        return descriptor;
    }
}

export function Put(path: string) {
    return function(target: any, method: string, descriptor: PropertyDescriptor) {
        routeMetadata.set(`${target.constructor.name}_${method}`, {method: HTTP_PUT, path, handler: descriptor.value});

        return descriptor;
    }
}

export function Delete(path: string) {
    return function(target: any, method: string, descriptor: PropertyDescriptor) {
        routeMetadata.set(`${target.constructor.name}_${method}`, {method: HTTP_DELETE, path, handler: descriptor.value});

        return descriptor;
    }
}