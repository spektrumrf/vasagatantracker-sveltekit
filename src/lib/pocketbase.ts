import { env } from "$env/dynamic/private";
import PocketBase from "pocketbase";

export async function getClient(cookie: string) {
  const pocketbaseUrl = env.ENV === "DEV"
  	? 'https://vasagatantracker-pocketbase-dev.up.railway.app'
  	: 'https://vasagatantracker-pocketbase-prod.up.railway.app';
  const client = new PocketBase(pocketbaseUrl);
  client.authStore.loadFromCookie(cookie);
  return client;
}
