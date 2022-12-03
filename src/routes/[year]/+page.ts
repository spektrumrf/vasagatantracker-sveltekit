import type { PageLoad } from './$types';

export const load: PageLoad = function ({ params }) {
	return { year: params.year };
};
