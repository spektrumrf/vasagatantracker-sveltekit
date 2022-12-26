import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function({ locals, params }) {
  const event = await locals
    .client
    .collection("event")
    .getFirstListItem(`year=${params.year}`)
    .catch((e) => { throw error(e.status, e.data.message) });
  return { event: event.export() };
}
