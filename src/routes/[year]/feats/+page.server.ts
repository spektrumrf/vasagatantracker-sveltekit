import { FeatContent } from "$lib/stores";
import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const ssr = false;

export const actions: Actions = {
  add: async ({ request, locals }) => {
    const formData = await request.formData();
    formData.set("team", locals.client.authStore.model?.id as string);
    const proofsBlob = formData.get("proofs") as Blob;
    if(proofsBlob.size === 0) {
      formData.delete("proofs");
    }
    const feat = await locals
      .client
      .collection("feat")
      .create(formData)
      .catch(e => { throw error(e.status, e.data.message) })
    console.log(feat);
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
