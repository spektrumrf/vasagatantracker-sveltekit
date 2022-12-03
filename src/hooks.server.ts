import type { Handle } from '@sveltejs/kit';

import PocketBase from 'pocketbase';

const client = new PocketBase('http://localhost:8090');

export const handle: Handle = async function ({ event, resolve }) {
	event.locals.client = client;
	const response = await resolve(event);
	return response;
};
