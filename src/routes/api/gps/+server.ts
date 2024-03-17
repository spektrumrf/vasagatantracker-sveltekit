import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async function ({ request, locals }) {
	const { event, team, longitude, latitude } = await request.json();
	if (!event || !team || !longitude || !latitude) {
		error(400, { message: 'Fält saknas' });
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
		error(400, { ...e });
	}
	return json({ position });
};
export const PATCH: RequestHandler = async function ({ request, locals }) {
	const { allowGps } = await request.json();
	if (typeof allowGps !== 'boolean') {
		error(400, { message: 'Fält saknas' });
	}
	let account;
	try {
		account = await locals.client
			.collection('account')
			.update(locals.client.authStore.model?.id, { allowGps });
	} catch (e: any) {
		error(400, { ...e });
	}
	return json({ account });
};
