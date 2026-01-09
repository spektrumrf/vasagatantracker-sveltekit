import type { Handle, HandleServerError } from '@sveltejs/kit';
import { getClient } from '$lib/pocketbase';
//import * as Sentry from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

const myHandle: Handle = async function ({ event, resolve }) {
	const cookie = event.cookies.get('pocketbase_auth') || '';
	const client = await getClient(cookie);
	event.locals.client = client;
	const authStore = client.authStore;

	if (authStore.isValid) {
		try {
			await client.collection('account').authRefresh();
			const account = await client
				.collection('account')
				.getOne(authStore.model?.id as string, { expand: 'event' });
			if (
				account.role === 'admin' ||
				!event.params.year ||
				account?.expand?.event?.year.toString() === event.params.year
			) {
				event.cookies.set('pocketbase_auth', authStore.exportToCookie(), { path: '/' });
			} else {
				authStore.clear();
				event.cookies.delete('pocketbase_auth', { path: '/' });
			}
		} catch (e) {
			authStore.clear();
			event.cookies.delete('pocketbase_auth', { path: '/' });
		}
	} else {
		authStore.clear();
		event.cookies.delete('pocketbase_auth', { path: '/' });
	}

	return resolve(event);
};

// Sentry.init({
	// dsn: 'https://cc7c02b5a9339bf0698f8ab541b3d825@o4504774078693376.ingest.us.sentry.io/4508992848068608',
	// tracesSampleRate: 1.0
	// Add the Http integration for tracing
// });

//export const handleError: HandleServerError = Sentry.handleErrorWithSentry();
//export const handle = sequence(Sentry.sentryHandle(), myHandle);
export const handle = myHandle;
