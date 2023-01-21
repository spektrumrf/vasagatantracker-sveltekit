import { dev } from "$app/environment";
import PocketBase from "pocketbase";

export async function getClient(cookie: string) {
  const pocketbaseUrl = dev
  	? 'https://pocketbase-docker-dev.up.railway.app'
  	: 'https://pocketbase-docker-prod.up.railway.app';
  const client = new PocketBase(pocketbaseUrl);
  client.authStore.loadFromCookie(cookie);
  return client;
}
