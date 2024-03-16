<script lang="ts">
	import L from 'leaflet';
	import { onDestroy, onMount } from 'svelte';
	import { Role, account, event } from '$lib/stores';
	let map;
	let gpsSub: NodeJS.Timeout;
	onMount(() => {
		map = L.map('map').setView([60.1885, 24.957], 16);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		if ($account && $account.role === Role.TEAM && $account.allowGps) {
			gpsSub = setInterval(saveLocation, 20000);
			saveLocation();
		}
	});
	onDestroy(() => clearInterval(gpsSub));
	async function saveLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (loc) => {
				await fetch('/api/gps', {
					method: 'POST',
					body: JSON.stringify({
						event: $event?.id,
						latitude: loc.coords.latitude,
						longitude: loc.coords.longitude,
						team: $account?.id
					})
				});
			});
		}
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
		integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
		crossorigin=""
	/>
</svelte:head>

<div id="map" bind:this={map}></div>

<style>
	#map {
		height: 300px;
	}
</style>
