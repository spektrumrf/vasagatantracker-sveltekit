import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ locals }) {
	const events = await locals.client.collection('event').getFullList();
	const currentEvent = events.find((e) => e.year === new Date().getFullYear());
  if(!currentEvent) {
      throw error(404, "no current event found");
  }
	throw redirect(303, `/${currentEvent.year}`);
};
