import type { Handle } from '@sveltejs/kit';
import { getClient } from '$lib/pocketbase';

export const handle: Handle = async function({ event, resolve }) {
	const cookie = event.cookies.get("pocketbase_auth") || "";
	const client = await getClient(cookie);
	event.locals.client = client;
	const authStore = client.authStore;
	if (authStore.isValid) {
		try {
			await client.collection("account").authRefresh();
			const account = await client.collection("account").getOne(authStore.model?.id as string, { expand: "event" }).then(a => a.export());
			if (!event.params.year || account.expand.event.year.toString() === event.params.year) {
				event.cookies.set('pocketbase_auth', authStore.exportToCookie(), { path: "/" });
			} else {
				authStore.clear();
				event.cookies.delete("pocketbase_auth");
			}
		} catch (e) {
			authStore.clear();
			event.cookies.delete("pocketbase_auth");
		}
	} else {
		authStore.clear();
		event.cookies.delete("pocketbase_auth");
	}

	return resolve(event);
};
