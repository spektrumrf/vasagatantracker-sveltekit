<script lang="ts">
	import { account, feats, locations, event, teams, Role } from '$lib/stores';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { getClient } from '$lib/pocketbase';
	import { PUBLIC_ENV } from '$env/static/public';

	export let data: LayoutData;
	$: {
		$account = data.account;
		$feats = data.feats;
		$locations = data.locations;
		$event = data.event;
		$teams = data.teams;
	}

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

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
		client.collection('account').subscribe('*', async () => {
			$teams = await fetch(`/api/teams?year=${$page.params.year}`).then((res) => res.json());
		});
		if ($event) {
			client
				.collection('event')
				.subscribe($event.id, async (data) => ($event = data.record as any));
		}
	});
</script>

<div class="flex min-h-screen flex-col">
	<header class="sticky top-0 z-50 border-b border-stone-200 bg-white">
		<div class="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
			{#if $account}
				<div class="flex items-center">
					<div class="relative">
						<button
							on:click={toggleMenu}
							class="-ml-2 rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-brand-600 focus:ring-2 focus:ring-brand-500 focus:outline-none focus:ring-inset"
							aria-expanded={menuOpen}
						>
							<span class="sr-only">Open menu</span>
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h7"
								/>
							</svg>
						</button>

						{#if menuOpen}
							<!-- Overlay -->
							<button
								class="fixed inset-0 z-40 h-full w-full cursor-default bg-stone-900/20 backdrop-blur-sm"
								on:click={closeMenu}
								aria-label="Close menu"
							></button>

							<!-- Dropdown menu -->
							<div
								class="ring-opacity-5 absolute left-0 z-50 mt-2 w-56 divide-y divide-stone-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black"
							>
								<div class="bg-stone-50 px-4 py-3">
									<p class="text-sm text-stone-500">Inloggad som</p>
									<p class="truncate text-sm font-medium text-stone-900">
										{$account?.name || $account?.username || ''}
									</p>
								</div>
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<div class="py-1" on:click={closeMenu}>
									<a
										href={`${$page.url.origin}/${$page.params.year}/feats`}
										class="block px-4 py-2 text-sm text-stone-700 hover:bg-brand-50 hover:text-brand-700"
										>Prestationer</a
									>
									<a
										href={`${$page.url.origin}/${$page.params.year}/teams`}
										class="block px-4 py-2 text-sm text-stone-700 hover:bg-brand-50 hover:text-brand-700"
										>Lag</a
									>
									<a
										href={`${$page.url.origin}/${$page.params.year}/locations`}
										class="block px-4 py-2 text-sm text-stone-700 hover:bg-brand-50 hover:text-brand-700"
										>Platser</a
									>
									<a
										href={`${$page.url.origin}/${$page.params.year}/statistics`}
										class="block px-4 py-2 text-sm text-stone-700 hover:bg-brand-50 hover:text-brand-700"
										>Statistik</a
									>
									{#if $account?.role === Role.ADMIN}
										<a
											href={`${$page.url.origin}/${$page.params.year}/admin`}
											class="block px-4 py-2 text-sm font-medium text-stone-700 hover:bg-brand-50 hover:text-brand-700"
											>Admin</a
										>
									{/if}
								</div>
								<div class="py-1">
									<form method="POST" action="/logout" class="w-full">
										<input hidden name="year" value={$page.params.year} />
										<button
											type="submit"
											class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
										>
											Logga ut
										</button>
									</form>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<div class="flex flex-1 justify-center lg:justify-start lg:pl-4">
				<a
					href={`/${$page.params.year}`}
					class="flex items-center font-serif text-xl font-bold text-brand-900 transition-colors hover:text-brand-700"
				>
					Vasagatantracker{PUBLIC_ENV === 'DEV' ? ' DEV' : ''}
				</a>
			</div>

			<div class="flex items-center justify-end">
				{#if !$account && !$page.url.toString().includes('login')}
					<a class="btn-primary px-4 py-1.5 text-sm" href={`/${$page.params.year}/login`}
						>Logga in</a
					>
				{/if}
			</div>
		</div>
	</header>

	<main class="mx-auto mb-12 w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
		<slot />
	</main>
</div>
