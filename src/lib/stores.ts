import { writable } from "svelte/store";

export const account = writable<Account | null>(null);
export const feats = writable<Feat[]>([]);
export const locations = writable<Location[]>([]);
export const event = writable<Event | null>(null);
export const teams = writable<Account[]>([]);

export type Account = {
  id: string,
  username: string,
  email: string,
  name: string,
  role: Role,
  avatar: string,
  coefficient: number,
  event: string,
  created: string,
  updated: string
}

export type Event = {
  id: string,
  info: { [key: string]: any },
  year: number,
  locations: string[],
  startTime: string,
  endTime: string,
  finished: boolean,
  created: string,
  updated: string  
}

export type Location = {
  id: string,
  name: string,
  created: string,
  updated: string
}

export type Feat = {
  id: string,
  location: string,
  event: string,
  team: string,
  content: { [key: string]: any },
  points: number,
  approved: boolean,
  teamComment: string,
  adminComment: string,
  proofs: string[],
  proofUrls: string[],
  expand?: { [key: string]: any },
  created: string,
  updated: string
}

enum Role {
  TEAM = "team",
  ADMIN = "admin"
}
