import { PUBLIC_ENV } from '$env/static/public';
import { browser } from '$app/environment';
import PocketBase from 'pocketbase';

export async function getClient(cookie: string) {
	let pocketbaseUrl = 'http://pocketbase:8080';

	if (browser) {
		pocketbaseUrl =
			PUBLIC_ENV === 'DEV'
				? 'https://db-dev.tracker.vasagatan.fi'
				: 'https://db.tracker.vasagatan.fi';
	}

	const client = new PocketBase(pocketbaseUrl);
	client.authStore.loadFromCookie(cookie);
	return client;
}
