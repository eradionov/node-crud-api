import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import {BadRequest} from "../Core/Exception/bad_request";

export const isUuid = (id: string | undefined): boolean =>
	id !== undefined && uuidValidate(id) && uuidVersion(id) === 4;

export const isNotBlank = (data: any): boolean => {
	return typeof data === 'string' && data.trim().length > 0;
};

export const isPositiveNumber = (data: any): boolean => {
	return !isNaN(data) && parseInt(data) > 0;
};

export const isNotBlankStringArray = (data: string[] | undefined): boolean => {
	return Array.isArray(data) && data.indexOf('') === -1;
};

export const validateBody = (body: any) => {
	if (body === undefined) {
		throw new BadRequest('Username, age, hobbies are required parameters');
	}

	if (!isNotBlank(body?.username)) {
		throw new BadRequest('Username is required');
	}

	if (!isPositiveNumber(body?.age)) {
		throw new BadRequest('Age is required and should be positive number');
	}

	if (!isNotBlankStringArray(body?.hobbies)) {
		throw new BadRequest(
			'Hobbies is required and should be empty array or contain data',
		);
	}
}
