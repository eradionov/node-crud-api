'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.remove = exports.update = exports.save = exports.findOne = exports.getAll = void 0;
var unique_error_1 = require('./Core/Exception/unique_error');
var not_found_1 = require('./Core/Exception/not_found');
var storage = new Map();
function getAll() {
	return Array.from(storage);
}
exports.getAll = getAll;
function findOne(id) {
	return storage.get(id);
}
exports.findOne = findOne;
function save(user) {
	if (findOne(user.id) !== undefined) {
		throw new unique_error_1.UniqueKeyException(user.id);
	}
	storage.set(user.id, user);
}
exports.save = save;
function update(user) {
	var foundUser = findOne(user === null || user === void 0 ? void 0 : user.id);
	if (foundUser === undefined) {
		throw new not_found_1.NotFound(user === null || user === void 0 ? void 0 : user.id);
	}
	storage.set(user.id, user);
}
exports.update = update;
function remove(id) {
	if (findOne(id) === undefined) {
		throw new not_found_1.NotFound(id);
	}
	storage.delete(id);
}
exports.remove = remove;
