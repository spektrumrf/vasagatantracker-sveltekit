import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const ssr = false;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { event, team, longitude, latitude } = await request.json();
		if (!event || !team || !longitude || !latitude) {
			return fail(400, { message: 'Fält saknas' });
		}
		let position;
		try {
			position = await locals.client.collection('position').create({
				event,
				team,
				longitude,
				latitude
			});
		} catch (e: any) {
			return fail(400, { ...e });
		}
		return { position };
	}
};
