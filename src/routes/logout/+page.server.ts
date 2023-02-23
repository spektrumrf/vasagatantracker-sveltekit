import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
   default: async ({ request, locals, cookies }) => {
      const year = await request.formData().then(form => form.get("year") as string);
      locals.client.authStore.clear();
      cookies.delete("pocketbase_auth");
      throw redirect(303, `/${year}`);
  }
}
