import {Controller, Get} from "../Core/decorators";
import {Request} from "../Core/request";
import {Response} from "../Core/response";

@Controller('api')
export class User {
    @Get('users')
    public getUsers(_: Request, _1: Response) {
    }

    // @Get('users/:userId')
    // public getUser(userId: string): void {
    //     console.log(userId);
    // }
}