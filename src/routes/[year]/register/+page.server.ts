import { env } from "$env/dynamic/private";
import { getClient } from "$lib/pocketbase";
import { Role } from "$lib/stores";
import { fail, redirect } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, params }) => {
    const form = await request.formData();
    form.set("role", Role.TEAM);
    const client = await getClient("");
    await client.admins.authWithPassword(env.ADMIN_EMAIL as string, env.ADMIN_PASSWORD as string)
    const res = await client
      .collection("account")
      .create(form)
      .catch((e: ClientResponseError) => fail(e.status, {...e.data.data}));
    if (res?.status) {
      return res;
    }
    throw redirect(303, `/${params.year}/login`);
  }
};