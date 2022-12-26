import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async function({ event, resolve }) {
	const client = new PocketBase("https://pocketbase-docker-dev.up.railway.app");
	event.locals.client = client;
	event.locals.client.authStore.loadFromCookie(event.cookies.get('pb_auth') || '');

	try {
		event.locals.client.authStore.isValid && await event.locals.client.collection('users').authRefresh();
	} catch (_) {
		event.locals.client.authStore.clear();
	}

	event.cookies.set('pb_auth', event.locals.client.authStore.exportToCookie(), { path: "/" });

	return resolve(event);
};
