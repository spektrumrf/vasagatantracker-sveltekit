import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  login: async ({ locals, cookies, request }) => {
    const form = await request.formData();
    const username = form.get("username") as string;
    const password = form.get("password") as string;
    await locals
      .client
      .collection("account")
      .authWithPassword(username, password)
      .catch(e => { throw error(e.status, e.data.message) });
    cookies.set("pb_auth", locals.client.authStore.exportToCookie(), { path: "/" });
    throw redirect(303, "/");
  }
};