import { env } from '$env/dynamic/public';
import PocketBase from 'pocketbase';

export async function getClient(cookie: string) {
	const pocketbaseUrl =
		env.PUBLIC_ENV === 'DEV'
			? 'https://db-dev.tracker.vasagatan.fi'
			: 'https://db.tracker.vasagatan.fi';
	const client = new PocketBase(pocketbaseUrl);
	client.authStore.loadFromCookie(cookie);
	return client;
}
