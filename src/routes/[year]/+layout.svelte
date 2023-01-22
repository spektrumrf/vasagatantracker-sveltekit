<script lang="ts">
	import { account, feats, locations, event } from '$lib/stores';
	import { page } from '$app/stores';
	import '../../app.css';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { getClient } from '$lib/pocketbase';

	export let data: LayoutData;
	$: {
		$account = data.account;
		$feats = data.feats;
		$locations = data.locations;
		$event = data.event;
	}
	onMount(async () => {
		const client = await getClient(data.cookie);
		client.collection('feat').subscribe('*', () => invalidateAll());
	});
</script>

<div class="m-5">
	<div class="navbar bg-base-100">
		<div class="flex-none">
			<div class="dropdown">
				<label for="menu" tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/></svg
					>
				</label>
				<ul
					name="menu"
					tabindex="0"
					class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a href={`${$page.url.origin}/${$page.params.year}/feats`}>Prestationer</a></li>
					<li><a href={`${$page.url.origin}/${$page.params.year}/locations`}>Platser</a></li>
					<li><a href={`${$page.url.origin}/${$page.params.year}/admin`}>Admin</a></li>
				</ul>
			</div>
		</div>
		<div class="grow">
			<a href="/" class="btn btn-ghost normal-case text-xl">Vasagatantracker</a>
		</div>
		<div class="flex-none">
			{#if $account}
				<span>{$account.name}</span>
				<form method="POST" action="/logout">
					<input hidden name="year" value={$page.params.year} />
					<button class="btn">Logga ut</button>
				</form>
			{:else}
				<a class="btn btn-primary" href={`/${$page.params.year}/login`}>Logga in</a>
			{/if}
		</div>
	</div>
	<slot />
</div>
