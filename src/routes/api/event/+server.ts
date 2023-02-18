import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async function({ locals, url }) {
  const event = await locals
    .client
    .collection("event")
    .getFirstListItem(`year = ${url.searchParams.get("year")}`)
    .catch(e => { throw error(e.status, e.data.message) });
  return json(event);
}