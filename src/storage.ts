import { UserDTO } from './DTO/User';
import { UniqueKeyException } from './Core/Exception/unique_error';
import { NotFound } from './Core/Exception/not_found';
import cluster from 'node:cluster';

type Storage = Map<string, UserDTO>;

const storage: Storage = new Map();

enum MessageType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface IClusterNotification {
  type: MessageType;
  user: UserDTO;
}

export function getAll() {
	return Array.from(storage.values());
}

export function findOne(id: string): UserDTO | undefined {
	return storage.get(id);
}

export function save(user: UserDTO) {
	if (findOne(user.id) !== undefined) {
		throw new UniqueKeyException(user.id);
	}

	storage.set(user.id, user);
	notify(MessageType.CREATE, user);
}

export function update(user: UserDTO) {
	const foundUser = findOne(user?.id);

	if (foundUser === undefined) {
		throw new NotFound(user?.id);
	}

	storage.set(user.id, user);
	notify(MessageType.UPDATE, user);
}

export function remove(id: string) {
	const user = findOne(id);

	if (user === undefined) {
		throw new NotFound(id);
	}

	storage.delete(id);
	notify(MessageType.DELETE, user);
}

function notify(type: MessageType, user?: UserDTO) {
	if (!cluster.isPrimary) {
    process?.send!({ type, user } as IClusterNotification);
	}

	if (cluster.isPrimary) {
		for (const id in cluster.workers) {
			if (cluster?.workers[id]?.isConnected()) {
				cluster?.workers[id]?.send({ type, user } as IClusterNotification);
			}
		}
	}
}

export function syncMultiClusterStorage(notification: IClusterNotification) {
	switch (notification.type) {
	case MessageType.CREATE:
		if (findOne(notification.user.id) !== undefined) {
			return;
		}
		save(notification.user);
		break;
	case MessageType.UPDATE:
		if (findOne(notification.user.id) === undefined) {
			return;
		}
		update(notification.user);
		break;
	case MessageType.DELETE:
		if (findOne(notification.user.id) === undefined) {
			return;
		}
		remove(notification.user.id);
		break;
	}
}
