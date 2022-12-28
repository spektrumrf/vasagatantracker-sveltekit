import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
   logout: async ({ locals, cookies }) => {
      locals.client.authStore.clear();
      cookies.delete("pb_auth");
      throw redirect(303, "/");
  }
}
