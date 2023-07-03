export class UserDTO {
	constructor(
    public readonly id: string,
    public username: string,
    public age: number,
    public hobbies: string[],
	) {}

	public static equals(user1: UserDTO, user2: UserDTO): boolean {
		return user1.username === user2.username
			&& user1.id === user2.id
			&& user1.age === user2.age
			&& JSON.stringify(user1.hobbies) === JSON.stringify(user2.hobbies);
	}
}
