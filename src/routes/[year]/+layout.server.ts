import type { Account, Event, Feat, Location } from '$lib/stores';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function ({ fetch, locals, params }): Promise<Data> {
	const account = locals.client.authStore.model;
	const featsPromise = fetch(`/api/feats?year=${params.year}`).then((res) => res.json());
	const locationsPromise = fetch(`/api/locations?year=${params.year}`).then((res) => res.json());
	const eventPromise = fetch(`/api/event?year=${params.year}`).then((res) => res.json());
	const teamsPromise = fetch(`/api/teams?year=${params.year}`).then((res) => res.json());
	const [feats, locations, event, teams] = await Promise.all([
		featsPromise,
		locationsPromise,
		eventPromise,
		teamsPromise
	]);
	return {
		account: account?.export(),
		feats,
		locations,
		event,
		teams,
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
