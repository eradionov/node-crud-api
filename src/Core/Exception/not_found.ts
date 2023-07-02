export class NotFound extends Error {
	constructor(id: string) {
		super(`${id} was not found`);
	}
}
