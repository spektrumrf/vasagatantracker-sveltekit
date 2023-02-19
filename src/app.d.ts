// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Account } from '$lib/stores';

// and what to do when importing types
declare global {
declare namespace App {
	interface Locals {
		client: import('pocketbase').default;
		account: Account;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare module "svelte-table";
}