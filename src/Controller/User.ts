import { Controller, Delete, Get, Post, Put } from '../Core/decorators';
import { Request } from '../Core/request';
import {
	CONTENT_TYPE_JSON,
	HTTP_BAD_REQUEST,
	HTTP_CREATED,
	HTTP_INTERNAL_SERVER_ERROR,
	HTTP_NO_CONTENT,
	HTTP_NOT_FOUND,
	HTTP_OK,
	Response,
} from '../Core/response';
import { findOne, getAll, remove, save, update } from '../storage';
import { isUuid, validateBody } from '../Validator/user';
import { BadRequest } from '../Core/Exception/bad_request';
import { UserDTO } from '../DTO/User';
import { v4 as uuid } from 'uuid';
import { NotFound } from '../Core/Exception/not_found';

@Controller('api')
export class User {
  @Get('users')
	public getUsers(_: Request, res: Response, _3: Map<string, any>) {
		res.response.writeHead(HTTP_OK, CONTENT_TYPE_JSON);
		res.response.end(JSON.stringify(getAll()));
	}

  @Get('users/:userId')
  public getUser(_: Request, res: Response, params: Map<string, any>): void {
  	try {
  		const userId = params.get('userId');

  		if (!isUuid(userId)) {
  			throw new BadRequest('Invalid id');
  		}

  		const user = findOne(userId);

  		if (undefined === user) {
  			throw new NotFound(userId);
  		}

  		res.response.writeHead(HTTP_OK, CONTENT_TYPE_JSON);
  		res.response.end(JSON.stringify(user));
  	} catch (error) {
  		let errorType = HTTP_INTERNAL_SERVER_ERROR;
  		let errorMessage = '';

  		if (error instanceof BadRequest) {
  			errorType = HTTP_BAD_REQUEST;
  			errorMessage = error.message;
  		}

  		if (error instanceof NotFound) {
  			errorType = HTTP_NOT_FOUND;
  			errorMessage = error.message;
  		}

  		res.response.writeHead(errorType, CONTENT_TYPE_JSON);
  		res.response.end(JSON.stringify(errorMessage));
  	}
  }

  @Post('users')
  public createUser(
  	_: Request,
  	res: Response,
  	parameters: Map<string, any>,
  ): void {
  	try {
  		const body = parameters.get('body');

		validateBody(body);

  		save(new UserDTO(uuid(), body.username, body.age, body.hobbies));

  		res.response.writeHead(HTTP_CREATED, CONTENT_TYPE_JSON);
  		res.response.end();
  	} catch (error) {
  		let errorType = HTTP_INTERNAL_SERVER_ERROR;
  		let errorMessage = '';

  		if (error instanceof BadRequest) {
  			errorType = HTTP_BAD_REQUEST;
  			errorMessage = error.message;
  		}

  		res.response.writeHead(errorType, CONTENT_TYPE_JSON);
  		res.response.end(JSON.stringify(errorMessage));
  	}
  }

  @Put('users/:userId')
  public updateUser(_: Request, res: Response, params: Map<string, any>): void {
  	try {
  		const userId = params.get('userId');

  		if (!isUuid(userId)) {
  			throw new BadRequest('Invalid id');
  		}

  		const user = findOne(userId);
  		const body = params.get('body');

  		if (undefined === user) {
  			throw new NotFound(userId);
  		}

		validateBody(body);

  		update(new UserDTO(userId, body.username, body.age, body.hobbies));

  		res.response.writeHead(HTTP_OK, CONTENT_TYPE_JSON);
  		res.response.end();
  	} catch (error) {
  		let errorType = HTTP_INTERNAL_SERVER_ERROR;
  		let errorMessage = '';

  		if (error instanceof NotFound) {
  			errorType = HTTP_NOT_FOUND;
  			errorMessage = error.message;
  		}

  		if (error instanceof BadRequest) {
  			errorType = HTTP_BAD_REQUEST;
  			errorMessage = error.message;
  		}

  		res.response.writeHead(errorType, CONTENT_TYPE_JSON);
  		res.response.end(JSON.stringify(errorMessage));
  	}
  }

  @Delete('users/:userId')
  public deleteUser(_: Request, res: Response, params: Map<string, any>): void {
  	try {
  		const userId = params.get('userId');

  		if (!isUuid(userId)) {
  			throw new BadRequest('Invalid id');
  		}

  		remove(userId);

  		res.response.writeHead(HTTP_NO_CONTENT, CONTENT_TYPE_JSON);
  		res.response.end();
  	} catch (error) {
  		let errorType = HTTP_INTERNAL_SERVER_ERROR;
  		let errorMessage = '';

  		if (error instanceof NotFound) {
  			errorType = HTTP_NOT_FOUND;
  			errorMessage = error.message;
  		}

  		if (error instanceof BadRequest) {
  			errorType = HTTP_BAD_REQUEST;
  			errorMessage = error.message;
  		}

  		res.response.writeHead(errorType, CONTENT_TYPE_JSON);
  		res.response.end(JSON.stringify(errorMessage));
  	}
  }
}
