<script lang="ts">
	import { account, feats, locations, event, teams, Role } from '$lib/stores';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { getClient } from '$lib/pocketbase';
	import { PUBLIC_ENV } from '$env/static/public';
	import {
		Trophy,
		Users,
		MapPin,
		BarChart3,
		Settings,
		LogOut,
		Menu,
		X,
		LogIn
	} from 'lucide-svelte';

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

		// Delay subscriptions to avoid blocking the browser's load event or being affected by adblocker synchronous drops
		setTimeout(() => {
			client
				.collection('feat')
				.subscribe('*', async () => {
					$feats = await fetch(`/api/feats?year=${$page.params.year}`).then((res) => res.json());
				})
				.catch((err) => console.warn('Feat realtime subscription failed/blocked:', err));

			client
				.collection('location')
				.subscribe('*', async () => {
					$locations = await fetch(`/api/locations?year=${$page.params.year}`).then((res) =>
						res.json()
					);
				})
				.catch((err) => console.warn('Location realtime subscription failed/blocked:', err));

			client
				.collection('account')
				.subscribe('*', async () => {
					$teams = await fetch(`/api/teams?year=${$page.params.year}`).then((res) => res.json());
				})
				.catch((err) => console.warn('Account realtime subscription failed/blocked:', err));

			if ($event) {
				client
					.collection('event')
					.subscribe($event.id, async (data) => {
						$event = data.record as any;
					})
					.catch((err) => console.warn('Event realtime subscription failed/blocked:', err));
			}
		}, 1000);
	});
</script>

<div class="flex min-h-screen flex-col bg-stone-100">
	<header class="sticky top-0 z-50 border-b-4 border-stone-900 bg-white">
		<div class="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
			<!-- Left Slot: Branding -->
			<div class="flex items-center">
				<a
					href={`/${$page.params.year}`}
					class="group flex items-center font-mono text-lg font-black tracking-tighter uppercase sm:text-2xl"
				>
					<span class="text-stone-900 transition-colors group-hover:text-brand-600">Vasagatan</span>
					<span
						class="ml-1 bg-stone-900 px-2 py-0.5 text-white transition-colors group-hover:bg-brand-600"
						>tracker</span
					>
					{#if PUBLIC_ENV === 'DEV'}
						<span class="ml-2 hidden text-[10px] text-stone-400 sm:inline"
							>{PUBLIC_ENV === 'DEV' ? 'DEV' : ''}</span
						>
					{/if}
				</a>
			</div>

			<!-- Right Slot: Actions -->
			<div class="flex items-center gap-3">
				{#if !$account && !$page.url.toString().includes('login')}
					<a
						class="flex h-11 w-11 items-center justify-center border-4 border-stone-900 bg-brand-500 text-white shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
						href={`/${$page.params.year}/login`}
						title="Logga in"
					>
						<span class="sr-only">Logga in</span>
						<LogIn size={22} strokeWidth={3} />
					</a>
				{/if}

				{#if $account}
					<div class="relative">
						<button
							on:click={toggleMenu}
							class="flex h-11 w-11 items-center justify-center border-4 border-stone-900 bg-brand-500 text-white shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus:outline-none active:translate-x-[2px] active:translate-y-[2px]"
							aria-expanded={menuOpen}
						>
							<span class="sr-only">Open menu</span>
							<Menu size={22} strokeWidth={3} />
						</button>

						{#if menuOpen}
							<!-- Overlay -->
							<button
								class="fixed inset-0 z-40 h-full w-full cursor-default bg-stone-900/60 backdrop-blur-sm transition-opacity"
								on:click={closeMenu}
								aria-label="Close menu"
							></button>

							<!-- Centered Modal Menu -->
							<div
								class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
							>
								<div
									class="pointer-events-auto w-full max-w-sm border-4 border-stone-900 bg-white shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]"
								>
									<div
										class="flex items-center justify-between border-b-4 border-stone-900 bg-brand-500 px-6 py-4"
									>
										<div>
											<p
												class="font-mono text-xs font-bold tracking-widest text-stone-900 uppercase"
											>
												Inloggad som
											</p>
											<p class="truncate font-mono text-lg font-black text-white uppercase">
												{$account?.name || $account?.username || ''}
											</p>
										</div>
										<button
											aria-label="Stäng"
											on:click={closeMenu}
											class="text-stone-900 transition-transform hover:scale-110 active:scale-95"
										>
											<X size={32} strokeWidth={3} />
										</button>
									</div>

									<div class="grid grid-cols-2 gap-4 bg-stone-100 p-6">
										<a
											on:click={closeMenu}
											href={`${$page.url.origin}/${$page.params.year}/feats`}
											class="group flex aspect-square flex-col items-center justify-center card border-4 border-stone-900 bg-white p-4 text-center transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(219,39,119,1)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(219,39,119,1)]"
										>
											<div
												class="mb-3 text-stone-900 transition-transform group-hover:scale-110 group-hover:text-brand-600"
											>
												<Trophy size={40} strokeWidth={2.5} />
											</div>
											<span
												class="font-mono text-sm font-black text-stone-900 group-hover:text-brand-600"
												>PRESTATIONER</span
											>
										</a>
										<a
											on:click={closeMenu}
											href={`${$page.url.origin}/${$page.params.year}/teams`}
											class="group flex aspect-square flex-col items-center justify-center card border-4 border-stone-900 bg-white p-4 text-center transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(219,39,119,1)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(219,39,119,1)]"
										>
											<div
												class="mb-3 text-stone-900 transition-transform group-hover:scale-110 group-hover:text-brand-600"
											>
												<Users size={40} strokeWidth={2.5} />
											</div>
											<span
												class="font-mono text-sm font-black text-stone-900 group-hover:text-brand-600"
												>LAG</span
											>
										</a>
										<a
											on:click={closeMenu}
											href={`${$page.url.origin}/${$page.params.year}/locations`}
											class="group flex aspect-square flex-col items-center justify-center card border-4 border-stone-900 bg-white p-4 text-center transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(219,39,119,1)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(219,39,119,1)]"
										>
											<div
												class="mb-3 text-stone-900 transition-transform group-hover:scale-110 group-hover:text-brand-600"
											>
												<MapPin size={40} strokeWidth={2.5} />
											</div>
											<span
												class="font-mono text-sm font-black text-stone-900 group-hover:text-brand-600"
												>PLATSER</span
											>
										</a>
										<a
											on:click={closeMenu}
											href={`${$page.url.origin}/${$page.params.year}/statistics`}
											class="group flex aspect-square flex-col items-center justify-center card border-4 border-stone-900 bg-white p-4 text-center transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(219,39,119,1)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(219,39,119,1)]"
										>
											<div
												class="mb-3 text-stone-900 transition-transform group-hover:scale-110 group-hover:text-brand-600"
											>
												<BarChart3 size={40} strokeWidth={2.5} />
											</div>
											<span
												class="font-mono text-sm font-black text-stone-900 group-hover:text-brand-600"
												>STATISTIK</span
											>
										</a>
										{#if $account?.role === Role.ADMIN}
											<a
												on:click={closeMenu}
												href={`${$page.url.origin}/${$page.params.year}/admin`}
												class="group col-span-2 flex items-center justify-center card border-4 border-brand-600 bg-brand-50 p-4 text-center transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(219,39,119,1)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(219,39,119,1)]"
											>
												<div class="mr-3 text-brand-600 transition-transform group-hover:rotate-90">
													<Settings size={28} strokeWidth={3} />
												</div>
												<span class="font-mono text-lg font-black text-brand-600">ADMIN</span>
											</a>
										{/if}
										<form method="POST" action="/logout" class="col-span-2 w-full">
											<input hidden name="year" value={$page.params.year} />
											<button
												type="submit"
												class="group flex w-full items-center justify-center card border-4 border-stone-900 bg-stone-900 p-4 text-center transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-stone-800 hover:shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]"
											>
												<div
													class="mr-3 text-white transition-transform group-hover:-translate-x-1"
												>
													<LogOut size={28} strokeWidth={3} />
												</div>
												<span class="font-mono text-lg font-black text-white">LOGGA UT</span>
											</button>
										</form>
									</div>
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</header>

	<main class="mx-auto mb-12 w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
		<slot />
	</main>
</div>
