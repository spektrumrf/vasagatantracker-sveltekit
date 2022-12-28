import { error, invalid, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ locals, cookies, request, url }) => {
    const form = await request.formData();
    const username = form.get("username") as string;
    const password = form.get("password") as string;
    const eventId = form.get("eventId") as string;
    const result = await locals
      .client
      .collection("account")
      .authWithPassword(username, password)
      .catch(e => e);
    if (result.status === 400) {
      return invalid(400, { username, credentialsError: "Inloggningen misslyckades, fel lösenord eller användarnamn" });
    }
    const user = await locals
      .client
      .collection("account")
      .getOne(locals.client.authStore.model?.id || "");
    if (user.event !== eventId) {
      locals.client.authStore.clear();
      cookies.delete("pb_auth")
      return invalid(400, { incorrectYear: "Användaren du loggat in deltog i evenemanget i ett annat år." })
    }
    cookies.set("pb_auth", locals.client.authStore.exportToCookie(), { path: "/" });
    throw redirect(303, "/");
  }
};