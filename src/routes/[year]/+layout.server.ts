import type { Account, Event, Feat, Location } from '$lib/stores';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function({ locals, params }) {
  const account = locals
    .client
    .authStore
    .model;
  const feats = await locals
    .client
    .collection("feat")
    .getFullList(undefined, { expand: "team,location", sort: "-created" })
    .catch(e => { throw error(e.status, e.data.message) });
  const featsWithProofUrls = feats.map(
    f =>
    ({
      ...f.export(),
      proofUrls: f.proofs.map((p: string) => locals.client.getFileUrl(f, p))
    })
  );
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
    feats: featsWithProofUrls,
    locations: locations.map(l => l.export()),
    event: event.export() 
  } as Data;
}

type Data = {
  account: Account,
  feats: Feat[],
  locations: Location[],
  event: Event
}

