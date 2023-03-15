import { FeatContent } from "$lib/stores";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";

export const ssr = false;

const addSchema = z.object({
  points: z.number().min(0).max(15),
  location: z.string().min(0),
  locationName: z.string().nonempty(),
  teamComment: z.string().optional()
})

export const load: PageServerLoad = async function(event) {
  const form = await superValidate(event, addSchema);  
  return { form };
}
export const actions: Actions = {
  add: async (event) => {
    const form = await superValidate(event, addSchema);
    const formData = await event.request.formData();
    console.log(Object.fromEntries(formData.entries()))
    if(!form.valid) {
      return fail(400, { form });
    } else if(form.data.locationName === "Övrig" && !form.data.teamComment) {
      form.errors.teamComment = ["Övriga platser kräver kommentar"];
      return fail(400, { form } )
    }
    try {
      await event.locals
        .client
        .collection("feat")
        .create({ ...formData, team: event.locals.client.authStore.model?.id })
    } catch (e: any) {
      return fail(400, { form, ...e })
    }
    return { form };
  },
  edit: async ({ request, locals }) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData.entries());
    let content: any = {};
    Object.values(FeatContent).forEach((c: string) => content[c] = Number(formData.get(c)));
    // Super hack, sorry
    content["öl"] = Number(formData.get("Ã¶l"));
    formObject.approved = formObject.approved ? "true" : "false";
    const feat = await locals
      .client
      .collection("feat")
      .update(formData.get("id") as string, { ...formObject, content })
      .catch(e => { throw error(e.status, e.data.message) })
    return { feat };
  }

}
