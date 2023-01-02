import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function({ locals, params }) {
  const account = locals
    .client
    .authStore
    .model;
  const feats = await locals
    .client
    .collection("feat")
    .getFullList(undefined, { expand: "team,location", sort: "-created" })
    .catch(e => { throw error(e.status, e.data.message) });
  const locations = await locals
    .client
    .collection("location")
    .getFullList()
    .catch(e => { throw error(e.status, e.data.message) });
  const event = await locals
    .client
    .collection("event")
    .getFirstListItem(`year = ${params.year}`)
    .catch(e => { throw error(e.status, e.data.message) });
  return {
    account: account?.export(),
    feats: feats.map(f => f.export()),
    locations: locations.map(l => l.export()),
    event: event.export()
  };
}

