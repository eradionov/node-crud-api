'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = exports.Controller = void 0;
var request_1 = require('./request');
var route_utils_1 = require('./route_utils');
function Controller(prefix) {
	if (prefix === void 0) { prefix = ''; }
	return function (constructor) {
		var _a;
		var instance = new constructor();
		var methods = Object.getOwnPropertyNames(constructor.prototype);
		for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
			var method = methods_1[_i];
			if (method !== 'constructor') {
				var handler = (_a = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), method)) === null || _a === void 0 ? void 0 : _a.value;
				if (undefined !== handler) {
					var metadata = Reflect.get(handler, 'route');
					if (metadata) {
						(0, route_utils_1.exportRoutes)('/'.concat(prefix, '/').concat(metadata.path), metadata.method, handler.bind(instance));
					}
				}
			}
		}
	};
}
exports.Controller = Controller;
function Get(path) {
	return function (_, _1, descriptor) {
		Reflect.defineProperty(descriptor.value, 'route', {
			value: { method: request_1.HTTP_GET, path: path, handler: descriptor.value },
			writable: false,
			enumerable: false,
		});
		return descriptor;
	};
}
exports.Get = Get;
function Post(path) {
	return function (_, _1, descriptor) {
		Reflect.defineProperty(descriptor.value, 'route', {
			value: { method: request_1.HTTP_POST, path: path, handler: descriptor.value },
			writable: false,
			enumerable: false,
		});
		return descriptor;
	};
}
exports.Post = Post;
function Put(path) {
	return function (_, _1, descriptor) {
		Reflect.defineProperty(descriptor.value, 'route', {
			value: { method: request_1.HTTP_PUT, path: path, handler: descriptor.value },
			writable: false,
			enumerable: false,
		});
		return descriptor;
	};
}
exports.Put = Put;
function Delete(path) {
	return function (target, key, descriptor) {
		Reflect.defineProperty(descriptor.value, 'route', {
			value: { method: request_1.HTTP_DELETE, path: path, handler: descriptor.value },
			writable: false,
			enumerable: false,
		});
		return descriptor;
	};
}
exports.Delete = Delete;
