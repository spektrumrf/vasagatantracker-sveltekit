import type { Handle, HandleServerError } from '@sveltejs/kit';
import { getClient } from '$lib/pocketbase';
import * as SentryNode from '@sentry/node';
import '@sentry/tracing';

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

SentryNode.init({
  dsn: "https://e8042ea7a3c64f2ba27befa6631c532e@o4504774078693376.ingest.sentry.io/4504774081839104", 
  tracesSampleRate: 1.0,
  // Add the Http integration for tracing
  integrations: [new SentryNode.Integrations.Http()]
});

SentryNode.setTag('svelteKit', 'server');

// use handleError to report errors during server-side data loading
export const handleError: HandleServerError = (({ error, event }) => {
  SentryNode.captureException(error, { contexts: { sveltekit: { event } } });
  return {
    message: "Some error happened, sorry!",
  };
});