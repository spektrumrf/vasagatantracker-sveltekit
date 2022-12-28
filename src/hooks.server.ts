import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async function({ event, resolve }) {
	const client = new PocketBase("https://pocketbase-docker-dev.up.railway.app");
	event.locals.client = client;

	const authStore = client.authStore;
	authStore.loadFromCookie(event.cookies.get('pb_auth') || '');

	if (authStore.isValid) {
		try {
			await client.collection("account").authRefresh();
			event.cookies.set('pb_auth', authStore.exportToCookie(), { path: "/" });
		} catch (e) {
			authStore.clear();
			event.cookies.delete("pb_auth");
		}
	} else {
		authStore.clear();
		event.cookies.delete("pb_auth");
	}

	return resolve(event);
};
