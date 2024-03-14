<script lang="ts">
	import { account, feats, locations, event, teams, Role } from '$lib/stores';
	import { page } from '$app/stores';
	import '../../app.css';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { getClient } from '$lib/pocketbase';
	import { env } from '$env/dynamic/public';

	export let data: LayoutData;
	$account = data.account;
	$feats = data.feats;
	$locations = data.locations;
	$event = data.event;
	$teams = data.teams;
	onMount(async () => {
		const client = await getClient(data.cookie);
		client
			.collection('feat')
			.subscribe(
				'*',
				async () =>
					($feats = await fetch(`/api/feats?year=${$page.params.year}`).then((res) => res.json()))
			);
		client
			.collection('location')
			.subscribe(
				'*',
				async () =>
					($locations = await fetch(`/api/locations?year=${$page.params.year}`).then((res) =>
						res.json()
					))
			);
		client
			.collection('account')
			.subscribe(
				'*',
				async () =>
					($teams = await fetch(`/api/teams?year=${$page.params.year}`).then((res) => res.json()))
			);
		if ($event) {
			client
				.collection('event')
				.subscribe($event.id, async (data) => ($event = data.record as any));
		}
	});
</script>

<div>
	<div class="navbar max-w-2xl mx-auto">
		{#if $account}
			<div class="flex-none">
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
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
					</div>
					<ul
						tabindex="0"
						class="menu dropdown-content z-[1] mt-3 p-2 text-lg shadow bg-base-100 rounded-box w-52"
					>
						<li class="w-full overflow-hidden"><span>{$account?.name || ''}</span></li>
						<div class="divider divider-primary -my-1"></div>
						<li><a href={`${$page.url.origin}/${$page.params.year}/feats`}>Prestationer</a></li>
						<li><a href={`${$page.url.origin}/${$page.params.year}/teams`}>Lag</a></li>
						<li><a href={`${$page.url.origin}/${$page.params.year}/locations`}>Platser</a></li>
						<li><a href={`${$page.url.origin}/${$page.params.year}/statistics`}>Statistik</a></li>
						{#if $account?.role === Role.ADMIN}
							<li><a href={`${$page.url.origin}/${$page.params.year}/admin`}>Admin</a></li>
						{/if}
						{#if $account}
							<div class="mx-auto my-2">
								<form method="POST" action="/logout">
									<input hidden name="year" value={$page.params.year} />
									<button class="btn btn-secondary"> Logga ut </button>
								</form>
							</div>
						{/if}
					</ul>
				</div>
			</div>
		{/if}
		<div class="grow">
			<a href={`/${$page.params.year}`} class="btn btn-ghost normal-case text-xl"
				>Vasagatantracker{env.PUBLIC_ENV === 'DEV' ? ' DEV' : ''}</a
			>
		</div>
		<div class="flex-none">
			{#if !$account && !$page.url.toString().includes('login')}
				<a class="btn btn-primary" href={`/${$page.params.year}/login`}>Logga in</a>
			{/if}
		</div>
	</div>
	<div class="max-w-2xl mx-auto">
		<div class="m-5">
			<slot />
		</div>
	</div>
</div>
