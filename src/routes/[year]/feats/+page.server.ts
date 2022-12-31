import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  add: async ({ request, locals }) => {
    const formData = await request.formData();
    formData.append("team", locals.client.authStore.model?.id as string);
    const feat= await locals
      .client
      .collection("feat")
      .create(formData)
      .catch(e => { throw error(e.status, e.data.message) })
    return { feat };
  }
}
