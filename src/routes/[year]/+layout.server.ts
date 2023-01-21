import type { Account, Event, Feat, Location } from '$lib/stores';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function({ locals, params }): Promise<Data> {
  const account = locals
    .client
    .authStore
    .model;
  const featsPromise = locals
    .client
    .collection("feat")
    .getFullList(undefined, { expand: "team,location", sort: "-created" })
    .catch(e => { throw error(e.status, e.data.message) });
  const locationsPromise = locals
    .client
    .collection("location")
    .getFullList()
    .catch(e => { throw error(e.status, e.data.message) });
  const eventPromise = locals
    .client
    .collection("event")
    .getFirstListItem(`year = ${params.year}`)
    .catch(e => { throw error(e.status, e.data.message) });
  const [feats, locations, event] = await Promise.all([featsPromise, locationsPromise, eventPromise]);
  const featsWithProofUrls = feats.map(
    f =>
    ({
      ...f.export(),
      proofUrls: f.proofs.map((p: string) => locals.client.getFileUrl(f, p))
    })
  );
  return {
    account: account?.export(),
    feats: featsWithProofUrls,
    locations: locations.map(l => l.export()),
    event: event.export(),
    cookie: locals.client.authStore.exportToCookie() 
  } as Data;
}

type Data = {
  account: Account,
  feats: Feat[],
  locations: Location[],
  event: Event,
  cookie: string
}

