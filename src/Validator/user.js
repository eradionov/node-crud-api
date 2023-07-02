'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isNotBlankStringArray = exports.isPositiveNumber = exports.isNotBlank = exports.isUuid = void 0;
var uuid_1 = require('uuid');
var uuid_2 = require('uuid');
var isUuid = function (id) {
	return id !== undefined && (0, uuid_2.validate)(id) && (0, uuid_1.version)(id) === 4;
};
exports.isUuid = isUuid;
var isNotBlank = function (data) {
	return typeof data === 'string' && data.trim().length > 0;
};
exports.isNotBlank = isNotBlank;
var isPositiveNumber = function (data) {
	return !isNaN(data) && parseInt(data) > 0;
};
exports.isPositiveNumber = isPositiveNumber;
var isNotBlankStringArray = function (data) {
	return Array.isArray(data) && data.indexOf('') === -1;
};
exports.isNotBlankStringArray = isNotBlankStringArray;
