<script lang="ts">
	import AddFeat from './AddFeat.svelte';
	import { account, event, Role } from '$lib/stores';

	const countDownDate = new Date($event?.startTime as string).getTime();

	let distance: number, days: number, hours: number, minutes: number, seconds: number;
	countdown();
	const interval = setInterval(countdown, 1000);
	$: {
		if (distance < 0) {
			clearInterval(interval);
		}
	}
	function countdown() {
		const now = new Date().getTime();
		distance = countDownDate - now;
		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);
	}

	function padZero(num: number) {
		return num.toString().padStart(2, '0');
	}
</script>

<div
	class="flex flex-col items-center card border-brand-200 bg-brand-50 p-6 text-center shadow-md sm:p-8"
>
	{#if distance >= 0 && !$event?.finished}
		<h2 class="mb-6 font-serif text-2xl font-bold text-brand-900 sm:text-3xl">
			Tid till Approbatur i Vasagatan
		</h2>

		<div class="flex justify-center gap-4 sm:gap-6">
			<div class="flex flex-col items-center">
				<div
					class="min-w-[3rem] rounded-lg border border-brand-100 bg-white px-4 py-3 font-mono text-3xl font-bold text-brand-700 shadow-sm sm:min-w-[4rem] sm:text-4xl"
				>
					{padZero(days)}
				</div>
				<span class="mt-2 text-xs font-medium tracking-wider text-brand-600 uppercase sm:text-sm"
					>Dagar</span
				>
			</div>

			<div class="flex flex-col items-center">
				<div
					class="min-w-[3rem] rounded-lg border border-brand-100 bg-white px-4 py-3 font-mono text-3xl font-bold text-brand-700 shadow-sm sm:min-w-[4rem] sm:text-4xl"
				>
					{padZero(hours)}
				</div>
				<span class="mt-2 text-xs font-medium tracking-wider text-brand-600 uppercase sm:text-sm"
					>Timmar</span
				>
			</div>

			<div class="flex flex-col items-center">
				<div
					class="min-w-[3rem] rounded-lg border border-brand-100 bg-white px-4 py-3 font-mono text-3xl font-bold text-brand-700 shadow-sm sm:min-w-[4rem] sm:text-4xl"
				>
					{padZero(minutes)}
				</div>
				<span class="mt-2 text-xs font-medium tracking-wider text-brand-600 uppercase sm:text-sm"
					>Min</span
				>
			</div>

			<div class="flex flex-col items-center">
				<div
					class="min-w-[3rem] rounded-lg border border-brand-100 bg-white px-4 py-3 font-mono text-3xl font-bold text-brand-700 shadow-sm sm:min-w-[4rem] sm:text-4xl"
				>
					{padZero(seconds)}
				</div>
				<span class="mt-2 text-xs font-medium tracking-wider text-brand-600 uppercase sm:text-sm"
					>Sek</span
				>
			</div>
		</div>
	{:else if distance < 0 && !$event?.finished}
		<h2 class="mb-6 font-serif text-2xl font-bold text-brand-900 sm:text-3xl">
			Vasagatan {$event?.year} har börjat!
		</h2>
		{#if $account?.role === Role.TEAM}
			<div class="mx-auto w-full max-w-md">
				<AddFeat formActionPath={`${$event?.year}/feats?/add`} />
			</div>
		{/if}
	{:else}
		<h2 class="font-serif text-2xl font-bold text-brand-900 sm:text-3xl">
			Vasagatan {$event?.year} är avslutad!
		</h2>
	{/if}
</div>
