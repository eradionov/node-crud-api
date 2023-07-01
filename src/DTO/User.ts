export class UserDTO {
    constructor(
        public readonly username: string,
        public readonly age: number|null,
        public readonly hobbies: string[]
    ) {
    }
}