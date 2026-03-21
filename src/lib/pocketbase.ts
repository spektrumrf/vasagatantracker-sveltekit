import { PUBLIC_ENV } from '$env/static/public';
import { browser } from '$app/environment';
import PocketBase from 'pocketbase';
import { dev } from '$app/environment';

export const POCKETBASE_URL_PUBLIC =
	PUBLIC_ENV === 'DEV'
		? 'https://db-dev.tracker.vasagatan.fi'
		: 'https://db.tracker.vasagatan.fi';

export const POCKETBASE_URL_INTERNAL = 'http://pocketbase:8080';

export async function getClient(cookie: string) {
	let pocketbaseUrl = POCKETBASE_URL_INTERNAL;

	if (browser || dev) {
		pocketbaseUrl = POCKETBASE_URL_PUBLIC;
	}

	const client = new PocketBase(pocketbaseUrl);
	client.authStore.loadFromCookie(cookie);
	return client;
}
