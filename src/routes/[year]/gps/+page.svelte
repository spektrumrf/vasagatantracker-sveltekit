<script lang="ts">
	import L from 'leaflet';
	import { onMount } from 'svelte';
	import { account, positions } from '$lib/stores';
	import { goto } from '$app/navigation';
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
		goto(window.location.pathname, { invalidateAll: true });
	}
	$: {
		if (map) {
			for (let marker of markers) {
				map.removeLayer(marker);
			}
			for (let position of Object.values($positions)) {
				const marker = L.circle([position.latitude, position.longitude], {
					color: 'blue',
					fillColor: '#f03',
					fillOpacity: 0.5,
					radius: 5
				})
					.bindPopup(position.expand.team.name)
					.addTo(map);
				markers = [...markers, marker];
			}
		}
	}
</script>

<h3 class="font-bold text-2xl mb-5">GPS</h3>
<div class="max-w-xs">
	<label class="label cursor-pointer">
		<span class="label-text">Dela din position</span>
		<input type="checkbox" class="toggle" bind:checked={allowGps} on:change={toggleAllowGps} />
	</label>
</div>
<div id="map" bind:this={map}></div>
<h4 class="font-bold text-xl my-5">Info</h4>
<p>
	Tillåt platsdata i din webläsare och tryck på "Dela din position" ovan för att se de andra lagens
	positioner på kartan. Fullständigt frivilligt och bara för skoj.
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
