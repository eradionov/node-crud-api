export class UserDTO {
	constructor(
    public readonly id: string,
    public username: string,
    public age: number,
    public hobbies: string[],
	) {}
}
