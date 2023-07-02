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
exports.createServer = void 0;
var route_utils_1 = require('./route_utils');
var http = require('http');
var request_1 = require('./request');
var response_1 = require('./response');
var createServer = function (port) {
	var server = http.createServer(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
		var route, _a, _b, _c, error_1;
		return __generator(this, function (_d) {
			switch (_d.label) {
			case 0:
				_d.trys.push([0, 2, , 3]);
				route = (0, route_utils_1.findRoute)(req.url === undefined ? process.env.HOME_URL : req.url, req.method === undefined ? request_1.HTTP_GET : req.method);
				if (route === undefined) {
					res.writeHead(response_1.HTTP_NOT_FOUND, response_1.CONTENT_TYPE_JSON);
					res.end('Not Found');
					return [2 /*return*/];
				}
				_b = (_a = route).handler;
				_c = [{ request: req },
					{ response: res }];
				return [4 /*yield*/, (0, route_utils_1.getParametersBag)(route, req)];
			case 1:
				_b.apply(_a, _c.concat([_d.sent()]));
				return [3 /*break*/, 3];
			case 2:
				error_1 = _d.sent();
				console.error(error_1);
				res.writeHead(response_1.HTTP_INTERNAL_SERVER_ERROR, response_1.CONTENT_TYPE_JSON);
				res.end('Internal server error');
				return [3 /*break*/, 3];
			case 3: return [2 /*return*/];
			}
		});
	}); });
	server.listen(port, function () {
		console.log('listening on port '.concat(port));
	});
};
exports.createServer = createServer;
