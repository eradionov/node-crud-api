'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.startCluster = void 0;
var node_cluster_1 = require('node:cluster');
var server_1 = require('./Core/server');
require('./storage');
function startCluster(cpus, port) {
	if (node_cluster_1.default.isPrimary) {
		console.log('Primary '.concat(process.pid, ' is running'));
		for (var i = 0; i < cpus; i++) {
			node_cluster_1.default.fork();
		}
		node_cluster_1.default.on('exit', function (worker, _, _2) {
			console.log('worker '.concat(worker.process.pid, ' died'));
			// Restart the worker
			node_cluster_1.default.fork();
		});
		(0, server_1.createServer)(port);
	}
	if (node_cluster_1.default.isWorker) {
		var workerPort = port + node_cluster_1.default.worker.id;
		(0, server_1.createServer)(workerPort);
		console.log('Worker '.concat(process.pid, ' started on port ').concat(workerPort));
	}
}
exports.startCluster = startCluster;
