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
</script>

<div class="text-center text-lg alert bg-zinc-200 flex flex-col">
	{#if distance >= 0 && !$event?.finished}
		<div class="font-bold text-2xl">Tid till Approbatur i Vasagatan</div>
		<div class="grid grid-flow-col text-center auto-cols-max justify-center">
			<div class="flex flex-col p-2 rounded-box text-primary">
				<span class="countdown font-mono text-3xl">
					<span style={`--value:${days};`}></span>
				</span>
				d
			</div>
			<div class="flex flex-col p-2 rounded-box text-primary">
				<span class="countdown font-mono text-3xl">
					<span style={`--value:${hours};`}></span>
				</span>
				h
			</div>
			<div class="flex flex-col p-2 rounded-box text-primary">
				<span class="countdown font-mono text-3xl">
					<span style={`--value:${minutes};`}></span>
				</span>
				min
			</div>
			<div class="flex flex-col p-2 rounded-box text-primary">
				<span class="countdown font-mono text-3xl">
					<span style={`--value:${seconds};`}></span>
				</span>
				sec
			</div>
		</div>
	{:else if distance < 0 && !$event?.finished}
		<div class="font-bold text-2xl">Vasagatan {$event?.year} har börjat!</div>
		{#if $account?.role === Role.TEAM}
			<div class="w-full">
				<AddFeat formActionPath={`${$event?.year}/feats?/add`} />
			</div>
		{/if}
	{:else}
		<div class="font-bold text-2xl">Vasagatan {$event?.year} är avslutad!</div>
	{/if}
</div>
