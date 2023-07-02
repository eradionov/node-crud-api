'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	return new (P || (P = Promise))(function (resolve, reject) {
		function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
		function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var __generator = (this && this.__generator) || function (thisArg, body) {
	var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	return g = { next: verb(0), 'throw': verb(1), 'return': verb(2) }, typeof Symbol === 'function' && (g[Symbol.iterator] = function() { return this; }), g;
	function verb(n) { return function (v) { return step([n, v]); }; }
	function step(op) {
		if (f) throw new TypeError('Generator is already executing.');
		while (g && (g = 0, op[0] && (_ = 0)), _) try {
			if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
			case 0: case 1: t = op; break;
			case 4: _.label++; return { value: op[1], done: false };
			case 5: _.label++; y = op[1]; op = [0]; continue;
			case 7: op = _.ops.pop(); _.trys.pop(); continue;
			default:
				if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
				if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
				if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
				if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
				if (t[2]) _.ops.pop();
				_.trys.pop(); continue;
			}
			op = body.call(thisArg, _);
		} catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
		if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	}
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.getBody = exports.getQueryParams = exports.getParametersBag = exports.findRoute = exports.exportRoutes = void 0;
var request_1 = require('./request');
var routes = [];
function exportRoutes(path, method, handler) {
	routes.push({ path: path, method: method, handler: handler });
}
exports.exportRoutes = exportRoutes;
function getMappedPathParams(from, to) {
	var _a;
	var urlParts = from === null || from === void 0 ? void 0 : from.split('/').filter(function (item) { return item; });
	var routeParts = to.split('/').filter(function (item) { return item; });
	var pathMapping = [];
	if (routeParts.length !== (urlParts === null || urlParts === void 0 ? void 0 : urlParts.length)) {
		return [];
	}
	for (var i = 0; i < routeParts.length; i++) {
		if (typeof routeParts[i] === 'string' && ((_a = routeParts[i]) === null || _a === void 0 ? void 0 : _a.startsWith(':'))) {
			var placeholder = routeParts[i].replace(':', '');
			if (placeholder.length > 0) {
				pathMapping[placeholder] = urlParts[i];
			}
		}
	}
	return pathMapping;
}
function findRoute(path, method) {
	return routes.find(function (route) {
		var _a;
		if (route.method !== method) {
			return false;
		}
		var urlParts = path === null || path === void 0 ? void 0 : path.split('/').filter(function (item) { return item; });
		var routeParts = route.path.split('/').filter(function (item) { return item; });
		if (routeParts.length !== (urlParts === null || urlParts === void 0 ? void 0 : urlParts.length)) {
			return false;
		}
		for (var i = 0; i < routeParts.length; i++) {
			if (routeParts[i] !== urlParts[i] && !((_a = routeParts[i]) === null || _a === void 0 ? void 0 : _a.startsWith(':'))) {
				return false;
			}
		}
		return true;
	});
}
exports.findRoute = findRoute;
function getParametersBag(route, req) {
	return __awaiter(this, void 0, void 0, function () {
		var params, _a, _b, _c;
		return __generator(this, function (_d) {
			switch (_d.label) {
			case 0:
				params = getQueryParams(req);
				if (![request_1.HTTP_PUT, request_1.HTTP_POST].includes(req.method)) return [3 /*break*/, 2];
				_b = (_a = params).set;
				_c = ['body'];
				return [4 /*yield*/, getBody(req)];
			case 1:
				_b.apply(_a, _c.concat([(_d.sent())]));
				_d.label = 2;
			case 2:
				Object.entries(getMappedPathParams(req.url, route.path)).forEach(function (_a) {
					var param = _a[0], value = _a[1];
					params.set(param, value);
				});
				return [2 /*return*/, params];
			}
		});
	});
}
exports.getParametersBag = getParametersBag;
function getQueryParams(req) {
	var protocol = process.env.HTTP_PROTOCOL || 'http';
	var queryData = new URL(req.url, ''.concat(protocol, '://').concat(req.headers.host))
		.searchParams;
	var queryParams = new Map();
	queryData.forEach(function (value, key) {
		queryParams.set(key, value);
	});
	return queryParams;
}
exports.getQueryParams = getQueryParams;
function getBody(req) {
	return __awaiter(this, void 0, void 0, function () {
		return __generator(this, function (_a) {
			return [2 /*return*/, new Promise(function (resolve, reject) {
				var chunks = '';
				req.on('data', function (chunk) {
					chunks += chunk;
				});
				req.on('end', function () {
					resolve(JSON.parse(chunks));
				});
				req.on('error', function (err) {
					reject(err);
				});
			})];
		});
	});
}
exports.getBody = getBody;
