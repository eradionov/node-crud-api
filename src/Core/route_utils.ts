import { HandlerType, RouteDefinition } from './route_definition';
import * as http from 'http';
import { HTTP_POST, HTTP_PUT } from './request';

const routes: RouteDefinition[] = [];

export function exportRoutes(
	path: string,
	method: string,
	handler: HandlerType,
) {
	routes.push({ path, method, handler });
}

function getMappedPathParams(from: string, to: string): { [key: string]: any } {
	const urlParts = from?.split('/').filter((item) => item);

	const routeParts = to.split('/').filter((item) => item);
	const pathMapping: { [key: string]: any } = [];

	if (routeParts.length !== urlParts?.length) {
		return [];
	}

	for (let i = 0; i < routeParts.length; i++) {
		if (typeof routeParts[i] === 'string' && routeParts[i]?.startsWith(':')) {
			const placeholder = routeParts[i]!.replace(':', '');

			if (placeholder.length > 0) {
				pathMapping[placeholder] = urlParts[i];
			}
		}
	}

	return pathMapping;
}

export function findRoute(
	path: string,
	method: string,
): RouteDefinition | undefined {
	return routes.find((route: RouteDefinition) => {
		if (route.method !== method) {
			return false;
		}

		const urlParts = path?.split('/').filter((item) => item);

		const routeParts = route.path.split('/').filter((item) => item);

		if (routeParts.length !== urlParts?.length) {
			return false;
		}

		for (let i = 0; i < routeParts.length; i++) {
			if (routeParts[i] !== urlParts[i] && !routeParts[i]?.startsWith(':')) {
				return false;
			}
		}

		return true;
	});
}

export async function getParametersBag(
	route: RouteDefinition,
	req: http.IncomingMessage,
): Promise<Map<string, any>> {
	const params = getQueryParams(req);

	if ([HTTP_PUT, HTTP_POST].includes(req.method!)) {
		params.set(
			'body',
      <{ username?: string; age?: number; hobbies?: string[] }>(
        await getBody(req)
      ),
		);
	}

	Object.entries(getMappedPathParams(req.url!, route.path)).forEach(
		([param, value]) => {
			params.set(param, value);
		},
	);

	return params;
}

export function getQueryParams(req: http.IncomingMessage): Map<string, any> {
	const protocol = process.env.HTTP_PROTOCOL || 'http';
	const queryData = new URL(req.url!, `${protocol}://${req.headers.host}`)
		.searchParams;
	const queryParams = new Map<string, any>();

	queryData.forEach((value, key) => {
		queryParams.set(key, value);
	});

	return queryParams;
}

export async function getBody(req: http.IncomingMessage) {
	return new Promise((resolve, reject) => {
		let chunks = '';

		req.on('data', (chunk) => {
			chunks += chunk;
		});
		req.on('end', () => {
			resolve(JSON.parse(chunks));
		});

		req.on('error', (err) => {
			reject(err);
		});
	});
}
