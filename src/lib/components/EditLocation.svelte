<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { locations, type Location } from '$lib/stores';
	let selectedLocation: Location | null;
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for="location">
		<span class="label-text-alt">Specialkrogar märkta med *</span>
	</label>
	<select name="location" class="select select-bordered" bind:value={selectedLocation}>
		<option disabled selected value={null}>Välj plats</option>
		{#each $locations as location}
			<option value={location}>{location.name}</option>
		{/each}
	</select>
</div>
{#if selectedLocation}
	<label for="editLocation" class="btn">Editera</label>
{/if}
<input type="checkbox" id="editLocation" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Editera plats</h3>
		<form method="POST" enctype="multipart/form-data" action="?/editLocation">
			<Input name="name" value={selectedLocation?.name || ""} type="text" label="Platsens namn" />
			<Input name="id" value={selectedLocation?.id} type="hidden" />
			<div>
				<button class="btn">Spara</button>
				<label for="editLocation" class="btn">Stäng</label>
			</div>
		</form>
	</div>
</div>
