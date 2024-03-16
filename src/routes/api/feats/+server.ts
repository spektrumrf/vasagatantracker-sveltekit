import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { Feat } from '$lib/stores';

export const GET: RequestHandler = async function ({ locals, url }) {
	const feats = await locals.client
		.collection('feat')
		.getFullList(undefined, {
			expand: 'team,location,event',
			sort: '-created',
			filter: `event.year=${url.searchParams.get('year')}`
		})
		.catch((e) => {
			throw error(e.status, e.data.message);
		});
	const featsWithProofUrls = feats.map((f: any) => ({
		...f,
		proofUrls: f.proofs.map((p: string) => locals.client.getFileUrl(f, p))
	})) as Feat[];
	return json(featsWithProofUrls);
};
