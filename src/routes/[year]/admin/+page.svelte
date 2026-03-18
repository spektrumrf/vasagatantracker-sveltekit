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

<div class="mb-24 space-y-12">
	<div>
		<h2 class="mb-6 font-serif text-3xl font-bold text-brand-900">Admin</h2>
		<hr class="mb-8 border-stone-200" />
	</div>

	<section class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
		<h3 class="mb-4 font-serif text-xl font-bold text-brand-900">Evenemang {$event?.year}</h3>
		<EditEvent />
	</section>

	<section class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
		<h3 class="mb-4 font-serif text-xl font-bold text-brand-900">Platser {$event?.year}</h3>
		<div class="mb-4 w-full max-w-sm">
			<div class="mb-1 flex items-end justify-between">
				<label class="block text-sm font-medium text-stone-700" for="location-year">
					Välj plats
				</label>
				<span class="text-xs text-stone-500">Specialkrogar märkta med *</span>
			</div>
			<select id="location-year" name="location" class="input-field" bind:value={selectedLocation}>
				<option disabled selected value={null}>Välj plats</option>
				{#each $locations as location}
					<option value={location}>{location.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex gap-3">
			<EditLocation {selectedLocation} />
		</div>
	</section>

	<section class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
		<h3 class="mb-4 font-serif text-xl font-bold text-brand-900">Alla platser</h3>
		<div class="mb-4 w-full max-w-sm">
			<div class="mb-1 flex items-end justify-between">
				<label class="block text-sm font-medium text-stone-700" for="location-all">
					Välj plats
				</label>
				<span class="text-xs text-stone-500">Specialkrogar märkta med *</span>
			</div>
			<select
				id="location-all"
				name="location"
				class="input-field"
				bind:value={selectedLocationToAddToYear}
			>
				<option disabled selected value={null}>Välj plats</option>
				{#each data.allLocations as location}
					<option value={location}>{location.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col items-start gap-4 sm:flex-row">
			<AddLocation />
			<AddLocationToYear {selectedLocationToAddToYear} />
		</div>
	</section>

	<section class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
		<h3 class="mb-4 font-serif text-xl font-bold text-brand-900">Lag</h3>
		<EditTeam />
	</section>
</div>
