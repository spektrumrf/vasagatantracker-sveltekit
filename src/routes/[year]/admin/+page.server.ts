import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const ssr = false;

export const actions: Actions = {
  edit: async ({ request, locals }) => {
    const formData = await request.formData();
    const { id, finished, ...info } = Object.fromEntries(formData.entries());
    const event = await locals
      .client
      .collection("event")
      .update(formData.get("id") as string, { info, finished: !!finished })
      .catch(e => { throw error(e.status, e.data.message) })
    return { event };
  },
  editLocation: async ({ request, locals }) => {
    const formData = await request.formData();
    const location = await locals
      .client
      .collection("location")
      .update(formData.get("id") as string, formData)
      .catch(e => { throw error(e.status, e.data.message) })
    return { location };
  },
  editTeam: async ({ request, locals }) => {
    const formData = await request.formData()   
    const account = await locals
      .client
      .collection("account")
      .update(formData.get("id") as string, formData )
      .catch(e => { throw error(e.status, e.data.message) })
    return { account };
  }
}
