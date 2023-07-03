import * as http from 'http';

export interface Response {
  response: http.ServerResponse;
}

export const HTTP_NOT_FOUND = 404;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_NO_CONTENT = 204;

export const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };
