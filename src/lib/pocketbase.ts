import { env } from "$env/dynamic/public";
import PocketBase from "pocketbase";

export async function getClient(cookie: string) {
  const pocketbaseUrl = env.PUBLIC_ENV === "DEV"
  	? 'https://vasagatantracker-pocketbase-dev.up.railway.app'
  	: 'https://vasagatantracker-pocketbase-prod.up.railway.app';
  const client = new PocketBase(pocketbaseUrl);
  client.authStore.loadFromCookie(cookie);
  return client;
}
