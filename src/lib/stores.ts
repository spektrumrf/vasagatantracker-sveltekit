import { writable, readable } from "svelte/store";
import { dev } from "$app/environment";

export const account = writable<any>(null);
export const feats = writable<any>(null);
export const locations = writable<any>(null);
export const event = writable<any>(null);
export const pocketbaseUrl = readable<string>(
  dev ?
    "https://pocketbase-docker-dev.up.railway.app" :
    "https://pocketbase-docker-prod.up.railway.app"
);
