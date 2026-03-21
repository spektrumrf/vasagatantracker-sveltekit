import type { Account, Event, Feat, Location } from '$lib/stores';
import type { LayoutServerLoad } from './$types';
import { POCKETBASE_URL_INTERNAL, POCKETBASE_URL_PUBLIC } from '$lib/pocketbase';

export const load: LayoutServerLoad = async function ({ locals, params }): Promise<Data> {
	const account = locals.client.authStore.model;

	const yearFilter = params.year;

	const featsPromise = locals.client
		.collection('feat')
		.getFullList(undefined, {
			expand: 'team,location,event',
			sort: '-created',
			filter: `event.year=${yearFilter}`
		})
		.then((feats) =>
			feats.map((f: any) => ({
				...f,
				proofUrls: f.proofs.map((p: string) =>
					locals.client.files.getURL(f, p).replace(POCKETBASE_URL_INTERNAL, POCKETBASE_URL_PUBLIC)
				)
			}))
		)
		.catch(() => []);

	const locationsPromise = locals.client
		.collection('location')
		.getFullList(undefined, {
			expand: 'team,location,event',
			sort: 'name',
			filter: yearFilter ? `event.year?~${yearFilter}` : ''
		})
		.catch(() => []);

	const eventPromise = locals.client
		.collection('event')
		.getFirstListItem(`year = ${yearFilter}`)
		.catch(() => null);

	const teamsPromise = locals.client
		.collection('account')
		.getFullList(undefined, {
			sort: 'name',
			filter: `event.year=${yearFilter}`
		})
		.then((accounts) => accounts.filter((a) => a.role === 'team'))
		.catch(() => []);

	const [feats, locations, event, teams] = await Promise.all([
		featsPromise,
		locationsPromise,
		eventPromise,
		teamsPromise
	]);

	return {
		account: account as unknown as Account,
		feats: feats as unknown as Feat[],
		locations: locations as unknown as Location[],
		event: event as unknown as Event,
		teams: teams as unknown as Account[],
		cookie: locals.client.authStore.exportToCookie()
	} as Data;
};

type Data = {
	account: Account;
	feats: Feat[];
	locations: Location[];
	event: Event;
	teams: Account[];
	cookie: string;
};
