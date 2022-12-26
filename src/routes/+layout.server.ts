import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async function({ locals }) {
  const feats = await locals
    .client
    .collection("feat")
    .getOne("gcclj7ouhyv4347")
    .catch(e => { throw error(e.status, e.data.message) });
  return { feats: feats.export() };

}
