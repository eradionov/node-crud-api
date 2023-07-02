export class UniqueKeyException extends Error {
	constructor(id: string) {
		super(`User ${id} already exists`);
	}
}
