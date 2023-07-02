import { HTTP_DELETE, HTTP_GET, HTTP_POST, HTTP_PUT } from './request';
import { exportRoutes } from './route_utils';
import { HandlerType } from './route_definition';

export function Controller(prefix = '') {
	return function <T extends { new (): {} }>(constructor: T) {
		const instance = new constructor();
		const methods = Object.getOwnPropertyNames(constructor.prototype);

		for (const method of methods) {
			if (method !== 'constructor') {
				const handler: HandlerType | undefined =
          Object.getOwnPropertyDescriptor(
          	Object.getPrototypeOf(instance),
          	method,
          )?.value;

				if (undefined !== handler) {
					const metadata = Reflect.get(handler, 'route');

					if (metadata) {
						exportRoutes(
							`/${prefix}/${metadata.path}`,
							metadata.method,
							handler.bind(instance),
						);
					}
				}
			}
		}
	};
}

export function Get(path: string) {
	return function (_: any, _1: string, descriptor: PropertyDescriptor) {
		Reflect.defineProperty(descriptor.value, 'route', {
			value: { method: HTTP_GET, path, handler: descriptor.value },
			writable: false,
			enumerable: false,
		});

		return descriptor;
	};
}

export function Post(path: string) {
	return function (_: any, _1: string, descriptor: PropertyDescriptor) {
		Reflect.defineProperty(descriptor.value, 'route', {
			value: { method: HTTP_POST, path, handler: descriptor.value },
			writable: false,
			enumerable: false,
		});

		return descriptor;
	};
}

export function Put(path: string) {
	return function (_: any, _1: string, descriptor: PropertyDescriptor) {
		Reflect.defineProperty(descriptor.value, 'route', {
			value: { method: HTTP_PUT, path, handler: descriptor.value },
			writable: false,
			enumerable: false,
		});

		return descriptor;
	};
}

export function Delete(path: string) {
	return function (_: any, _1: string, descriptor: PropertyDescriptor) {
		Reflect.defineProperty(descriptor.value, 'route', {
			value: { method: HTTP_DELETE, path, handler: descriptor.value },
			writable: false,
			enumerable: false,
		});

		return descriptor;
	};
}
