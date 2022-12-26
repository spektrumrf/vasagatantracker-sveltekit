import type { Actions } from "./$types";

export const actions: Actions = {
  login: async ({ locals, cookies, request }) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    await locals.client.collection("account").authWithPassword(email, password).catch(e => console.log(e));
    cookies.set("pb_auth", locals.client.authStore.exportToCookie());
    return { success: true }
  }
};