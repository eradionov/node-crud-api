import {Controller, Get, Post} from "../Core/decorators";
import {Request} from "../Core/request";
import {Response} from "../Core/response";

@Controller('api')
export class User {
    @Get('users')
    public getUsers(_: Request, _2: Response, _3: Map<string, any>) {
    }

    @Get('users/:userId')
    public getUser(_: Request, _2: Response, _3: Map<string, any>): void {
    }

    @Post('users')
    public createUser(_: Request, _2: Response, _3: Map<string, any>): void {
    }
}