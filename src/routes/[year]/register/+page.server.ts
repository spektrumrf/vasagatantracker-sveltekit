import { env } from "$env/dynamic/private";
import { getClient } from "$lib/pocketbase";
import { Role } from "$lib/stores";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, params }) => {
    const form = await request.formData();
    form.set("role", Role.TEAM);
    const client = await getClient("");
    await client.admins.authWithPassword(env.ADMIN_EMAIL as string, env.ADMIN_PASSWORD as string)
    await client
      .collection("account")
      .create(form)
      .catch((e: any) => e);
    throw redirect(303, `/${params.year}/login`);
  }
};