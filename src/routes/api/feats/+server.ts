import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import type { Feat } from "$lib/stores";

export const GET: RequestHandler = async function({ locals }) {
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
  ) as Feat[];
  return json(featsWithProofUrls);
}