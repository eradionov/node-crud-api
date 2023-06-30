import * as http from 'http';

export interface Request {
    request: http.IncomingMessage
}

export const HTTP_GET = 'GET';
export const HTTP_POST = 'POST';
export const HTTP_PUT = 'PUT';
export const HTTP_DELETE = 'DELETE';