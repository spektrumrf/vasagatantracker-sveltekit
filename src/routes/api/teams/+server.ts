import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { Role } from '$lib/stores';

export const GET: RequestHandler = async function ({ locals, url }) {
	const accounts = await locals.client
		.collection('account')
		.getFullList(undefined, {
			sort: 'name',
			filter: `event.year=${url.searchParams.get('year')}`
		})
		.catch((e) => {
			throw error(e.status, e.data.message);
		});
	const teams = accounts.filter((a) => a.role === Role.TEAM);
	return json(teams);
};
