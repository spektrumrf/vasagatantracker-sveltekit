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

<div class="mb-12 space-y-8">
	<div>
		<h2 class="mb-2 font-mono text-3xl font-black tracking-tighter text-brand-900 uppercase">
			Admin
		</h2>
		<hr class="border-t-4 border-stone-900" />
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<section class="flex flex-col card bg-white p-6 sm:p-8">
			<h3 class="mb-6 font-mono text-xl font-black tracking-tight text-brand-900 uppercase">
				Evenemang {$event?.year}
			</h3>
			<div class="flex-1">
				<EditEvent />
			</div>
		</section>

		<section class="flex flex-col card bg-white p-6 sm:p-8">
			<h3 class="mb-6 font-mono text-xl font-black tracking-tight text-brand-900 uppercase">Lag</h3>
			<div class="flex-1">
				<EditTeam />
			</div>
		</section>

		<section class="card bg-white p-6 sm:p-8 lg:col-span-2">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div>
					<h3 class="mb-6 font-mono text-xl font-black tracking-tight text-brand-900 uppercase">
						Platser {$event?.year}
					</h3>
					<div class="mb-6 w-full">
						<div class="mb-2 flex items-end justify-between">
							<label
								class="block font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
								for="location-year"
							>
								Välj plats
							</label>
							<span class="font-mono text-xs font-bold tracking-widest text-brand-600 uppercase"
								>Speciella *</span
							>
						</div>
						<select
							id="location-year"
							name="location"
							class="input-field"
							bind:value={selectedLocation}
						>
							<option disabled selected value={null}>Välj plats</option>
							{#each $locations as location}
								<option value={location}>{location.name}</option>
							{/each}
						</select>
					</div>
					<EditLocation {selectedLocation} />
				</div>

				<div class="border-t-4 border-stone-100 pt-8 md:border-t-0 md:border-l-4 md:pt-0 md:pl-8">
					<h3 class="mb-6 font-mono text-xl font-black tracking-tight text-brand-900 uppercase">
						Alla platser
					</h3>
					<div class="mb-6 w-full">
						<div class="mb-2 flex items-end justify-between">
							<label
								class="block font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
								for="location-all"
							>
								Välj plats
							</label>
							<span class="font-mono text-xs font-bold tracking-widest text-brand-600 uppercase"
								>Speciella *</span
							>
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
				</div>
			</div>
		</section>
	</div>
</div>
