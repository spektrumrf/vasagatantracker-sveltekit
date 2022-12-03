import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async function({locals}) {
    const events = await locals.client.collection("events").getFullList();
    return {events};
}