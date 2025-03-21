import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private';
import { getClient } from '$lib/pocketbase';
import type { Feat } from '$lib/stores';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ params }) {
	const client = await getClient('');
	await client.collection("_superusers").authWithPassword(ADMIN_EMAIL as string, ADMIN_PASSWORD as string);
	const feats: Feat[] = await client
		.collection('feat')
		.getFullList(undefined, { filter: `event.year = ${params.year}` });
	const approvedFeats = feats.filter((f) => f.approved);
	const totalDrinks: { [key: string]: number } = {};
	approvedFeats.forEach((f) => {
		const drinks = Object.keys(f.content);
		drinks.forEach((d: string) => {
			if (totalDrinks[d]) {
				totalDrinks[d] += f.content[d];
			} else {
				totalDrinks[d] = f.content[d];
			}
		});
	});
	return { totalDrinks };
};
