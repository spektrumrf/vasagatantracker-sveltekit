import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async function ({ locals }) {
	const locations = await locals.client
		.collection('location')
		.getFullList(undefined, { expand: 'team,location', sort: 'name' })
		.catch((e) => {
			throw error(e.status, e.data.message);
		});
	return json(locations);
};
