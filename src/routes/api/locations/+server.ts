import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async function ({ locals, url }) {
	const locations = await locals.client
		.collection('location')
		.getFullList(undefined, {
			expand: 'team,location,event',
			sort: 'name',
			filter: url.searchParams.get('year') ? `event.year?~${url.searchParams.get('year')}` : ''
		})
		.catch((e) => {
			throw error(e.status, e.data.message);
		});
	return json(locations || []);
};
