import { Role } from "$lib/stores";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const ssr = false;

export const load: PageServerLoad = async function({locals}) {
  if(locals.client.authStore.model?.export().role !== Role.ADMIN) {
    throw redirect(303, "/");
  }
}
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
      .update(formData.get("id") as string, formData)
      .catch(e => { throw error(e.status, e.data.message) })
    return { account };
  },
  deleteTeam: async ({ request, locals }) => {
    const formData = await request.formData()   
    const account = await locals
      .client
      .collection("account")
      .delete(formData.get("id") as string)
      .catch(e => { throw error(e.status, e.data.message) })
    return { account };
  }
}
