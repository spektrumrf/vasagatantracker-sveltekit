import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ locals }) {
	const events = await locals.client.collection('events').getFullList();
	const currentEvent = events.find((e) => e.year === new Date().getFullYear());
    if(!currentEvent) {
        throw error(404, "no current event found");
    }
    currentEvent.teams = undefined;
	return { currentEvent: JSON.parse(JSON.stringify(currentEvent)) };
};
