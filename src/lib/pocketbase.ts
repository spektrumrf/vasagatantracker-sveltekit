import { dev } from "$app/environment";
import PocketBase from "pocketbase";

export async function getClient(cookie: string) {
  const pocketbaseUrl = dev
  	? 'https://vasagatantracker-pocketbase-dev.up.railway.app'
  	: 'https://vasagatantracker-pocketbase-prod.up.railway.app';
  const client = new PocketBase(pocketbaseUrl);
  client.authStore.loadFromCookie(cookie);
  return client;
}
