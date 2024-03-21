<script lang="ts">
	import L from 'leaflet';
	import { onMount } from 'svelte';
	import { account, positions, event } from '$lib/stores';
	import Loading from '$lib/components/Loading.svelte';
	import dayjs from 'dayjs';
	let map: any;
	let allowGps = $account?.allowGps;
	let loading = false;
	let markers: L.Circle<any>[] = [];
	onMount(() => {
		map = L.map('map').setView([60.1885, 24.957], 16);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
	});
	async function toggleAllowGps() {
		loading = true;
		await fetch('/api/positions', { method: 'PATCH', body: JSON.stringify({ allowGps }) });
		loading = false;
		window.location.reload();
	}
	$: {
		if (map) {
			for (let marker of markers) {
				map.removeLayer(marker);
			}
			for (let position of Object.values($positions)) {
				const marker = L.circle([position.latitude, position.longitude], {
					color: '#FF007F',
					fillOpacity: 1,
					radius: 0.7
				})
					.bindPopup(positionToString(position))
					.addTo(map);
				markers = [...markers, marker];
			}
		}
	}
	const positionToString = (position: any) =>
		`${position.expand?.team?.name} kl.${new Date(position?.created).toLocaleTimeString('fi-FI').slice(0, 5)}`;
	const updateMapPosition = (position: any) =>
		(map = map.setView([position.latitude, position.longitude], 16));
	$: hasStarted = dayjs().toISOString() > dayjs($event?.startTime).toISOString();
</script>

<h3 class="font-bold text-2xl mb-5">GPS</h3>
{#if hasStarted}
	<div class="max-w-xs">
		<label class="label cursor-pointer">
			<span class="label-text">Dela din position</span>
			<Loading {loading}>
				<input
					type="checkbox"
					class="toggle disabled"
					bind:checked={allowGps}
					on:change={toggleAllowGps}
				/>
			</Loading>
		</label>
	</div>
{:else}
	<p>Ladda om sidan då Vasagatan har börjat</p>
{/if}
<div id="map" bind:this={map}></div>
{#if allowGps}
	<h4 class="font-bold text-xl mt-5 mb-2">Positioner</h4>
	<p class="italic">Tryck på lag för att centrera karta</p>
	<ul class="ml-5 mt-2 list-disc">
		{#each Object.values($positions) as position}
			<li class="cursor-pointer" on:click={() => updateMapPosition(position)}>
				{positionToString(position)}
			</li>
		{/each}
	</ul>
{/if}
<h4 class="font-bold text-xl my-5">Info</h4>
<p class="mb-5">
	Tillåt platsdata i din webläsare och tryck på "Dela din position" ovan för att se de andra lagens
	positioner på kartan. Fullständigt frivilligt och bara för skoj.
</p>
<p>
	OBS! Firefox Android har en potentiell bugg där platstillåtelsen nollställs till block då sidan
	laddas om trots beviljad åtkomst. Rekommenderar en annan webläsare på Android.
</p>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
		integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
		crossorigin=""
	/>
</svelte:head>

<style>
	#map {
		height: 300px;
		z-index: 0;
	}
</style>
