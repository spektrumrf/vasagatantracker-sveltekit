import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { dev } from '$app/environment';

export const handle: Handle = async function({ event, resolve }) {
	const pocketbaseUrl = dev ?
		"https://pocketbase-docker-dev.up.railway.app" :
		"https://pocketbase-docker-prod.up.railway.app"
	const client = new PocketBase(pocketbaseUrl);
	event.locals.client = client;

	const authStore = client.authStore;
	authStore.loadFromCookie(event.cookies.get('pb_auth') || '');
	if (authStore.isValid) {
		try {
			await client.collection("account").authRefresh();
			const account = await client.collection("account").getOne(authStore.model?.id as string, { expand: "event" }).then(a => a.export());
			if(!event.params.year || account.expand.event.year.toString() === event.params.year) {
				event.cookies.set('pb_auth', authStore.exportToCookie(), { path: "/" });
				event.locals.account = account;
			} else {
				authStore.clear();
				event.locals.account = undefined;
				event.cookies.delete("pb_auth");
			}
		} catch (e) {
			authStore.clear();
			event.locals.account = undefined;
			event.cookies.delete("pb_auth");
		}
	} else {
		authStore.clear();
		event.locals.account = undefined;
		event.cookies.delete("pb_auth");
	}

	return resolve(event);
};
