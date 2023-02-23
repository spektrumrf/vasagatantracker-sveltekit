import { FeatContent } from "$lib/stores";
import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const ssr = false;

export const actions: Actions = {
  add: async ({ request, locals }) => {
    const formData = await request.formData();
    formData.append("team", locals.client.authStore.model?.id as string);
    const feat = await locals
      .client
      .collection("feat")
      .create(formData)
      .catch(e => { throw error(e.status, e.data.message) })
    return { feat };
  },
  edit: async ({ request, locals }) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData.entries());
    let content: any = {};
    Object.values(FeatContent).forEach((c: string) => content[c] = Number(formData.get(c)));
    // Super hack, sorry
    content["öl"] = Number(formData.get("Ã¶l"));
    const feat = await locals
      .client
      .collection("feat")
      .update(formData.get("id") as string, { ...formObject, content })
      .catch(e => { throw error(e.status, e.data.message) })
    return { feat };
  }

}
