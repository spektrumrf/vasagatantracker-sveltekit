<script lang="ts">
	import EditEvent from '$lib/components/EditEvent.svelte';
	import EditLocation from '$lib/components/EditLocation.svelte';
	import EditTeam from '$lib/components/EditTeam.svelte';
	import AddLocation from '$lib/components/AddLocation.svelte';
	import { event, locations } from '$lib/stores';
	import type { Location } from '$lib/stores';
	import type { PageServerData } from './$types';
	import AddLocationToYear from '$lib/components/AddLocationToYear.svelte';
	export let data: PageServerData;
	let selectedLocation: Location;
	let selectedLocationToAddToYear: Location;
</script>

<h2 class="font-bold text-2xl">Admin</h2>

<span class="divider mb-5" />

<h3 class="font-bold text-xl mb-5">Evenemang {$event?.year}</h3>
<EditEvent />

<h3 class="font-bold text-xl mt-3 mb-1">Platser {$event?.year}</h3>
<div class="form-control w-full max-w-xs">
	<label class="label" for="location">
		<span class="label-text-alt">Specialkrogar märkta med *</span>
	</label>
	<select name="location" class="select select-bordered" bind:value={selectedLocation}>
		<option disabled value={null}>Välj plats</option>
		{#each $locations as location}
			<option value={location}>{location.name}</option>
		{/each}
	</select>
</div>
<div class="flex gap-3">
	<EditLocation {selectedLocation} />
</div>

<h3 class="font-bold text-xl mt-3 mb-1">Alla platser</h3>
<div class="form-control w-full max-w-xs">
	<label class="label" for="location">
		<span class="label-text-alt">Specialkrogar märkta med *</span>
	</label>
	<select name="location" class="select select-bordered" bind:value={selectedLocationToAddToYear}>
		<option disabled value={null}>Välj plats</option>
		{#each data.allLocations as location}
			<option value={location}>{location.name}</option>
		{/each}
	</select>
</div>
<div class="flex gap-3">
	<AddLocation />
	<AddLocationToYear {selectedLocationToAddToYear} />
</div>

<h3 class="font-bold text-xl my-3">Lag</h3>
<EditTeam />
