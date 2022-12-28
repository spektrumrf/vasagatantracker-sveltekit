import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
	throw redirect(303, `/${new Date().getFullYear()}`);
};
