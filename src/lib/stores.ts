import { writable } from "svelte/store";

export const account = writable<Account | null>(null);
export const feats = writable<Feat[]>([]);
export const locations = writable<Location[]>([]);
export const event = writable<Event | null>(null);
export const teams = writable<Account[]>([]);

function createFeatFilterSelections() {
  const selections = 
    typeof window !== "undefined" ?
    JSON.parse(window.localStorage.getItem("featFilterSelections") as string) || {}: 
    {}
  const { subscribe, set, update } = writable(selections);
  return {
    subscribe,
    set: (selections: any) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("featFilterSelections", JSON.stringify(selections))
      }
      set(selections)
    },
    update
  }
}
export const featFilterSelections = createFeatFilterSelections();

export type Account = {
  id: string,
  username: string,
  email: string,
  name: string,
  members: string,
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
  content: { [key: string]: number },
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

export enum Role {
  TEAM = "team",
  ADMIN = "admin"
}

export enum FeatContent {
  ÖL = "öl",
  CIDER = "cider",
  LONKERO = "lonkero",
  VIN = "vin",
  DRINK = "drink",
  MAT = "mat",
  SHOT = "shot",
  ANNAT = "annat"
}
