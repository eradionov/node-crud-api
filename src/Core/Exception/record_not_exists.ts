export class RecordNotExist extends Error {
	constructor(id: string) {
		super(`User ${id} does not exist`);
	}
}
