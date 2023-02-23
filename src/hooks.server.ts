import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { dev } from '$app/environment';

export const handle: Handle = async function({ event, resolve }) {
	const pocketbaseUrl = dev ?
		"https://vasagatantracker-pocketbase-dev.up.railway.app" :
		"https://vasagatantracker-pocketbase-prod.up.railway.app"
	const client = new PocketBase(pocketbaseUrl);
	event.locals.client = client;

	const authStore = client.authStore;
	authStore.loadFromCookie(event.cookies.get('pocketbase_auth') || '');
	if (authStore.isValid) {
		try {
			await client.collection("account").authRefresh();
			const account = await client.collection("account").getOne(authStore.model?.id as string, { expand: "event" }).then(a => a.export());
			if (!event.params.year || account.expand.event.year.toString() === event.params.year) {
				event.cookies.set('pocketbase_auth', authStore.exportToCookie(), { path: "/" });
				event.locals.account = account;
			} else {
				authStore.clear();
				event.locals.account = undefined;
				event.cookies.delete("pocketbase_auth");
			}
		} catch (e) {
			authStore.clear();
			event.locals.account = undefined;
			event.cookies.delete("pocketbase_auth");
		}
	} else {
		authStore.clear();
		event.locals.account = undefined;
		event.cookies.delete("pocketbase_auth");
	}

	return resolve(event);
};
