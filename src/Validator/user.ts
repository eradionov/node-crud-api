import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

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
