import {UserDTO} from './DTO/User';
import {UniqueKeyException} from './Core/Exception/unique_error';
import {NotFound} from './Core/Exception/not_found';

type Storage = Map<string, UserDTO>;

const storage: Storage = new Map();

export function getAll() {
	return Array.from(storage);
}

export function findOne(id: string): UserDTO | undefined {
	return storage.get(id);
}

export function save(user: UserDTO) {
	if (findOne(user.id) !== undefined) {
		throw new UniqueKeyException(user.id);
	}

	storage.set(user.id, user);
}

export function update(user: UserDTO) {
	const foundUser = findOne(user?.id);

	if (foundUser === undefined) {
		throw new NotFound(user?.id);
	}

	storage.set(user.id, user);
}

export function remove(id: string) {
	if (findOne(id) === undefined) {
		throw new NotFound(id);
	}

	storage.delete(id);
}
