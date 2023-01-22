<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event, locations, type Location } from '$lib/stores';
	let selectedLocation: Location;
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for="location">
		<span class="label-text-alt">Specialkrogar märkta med *</span>
	</label>
	<select name="location" class="select select-bordered">
		<option disabled selected>Välj plats</option>
		{#each $locations as location}
			<option value={location}>{location.name}</option>
		{/each}
	</select>
</div>
<label for="editLocation" class="btn">Editera</label>
<input type="checkbox" id="editLocation" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Editera plats</h3>
		<form method="POST" enctype="multipart/form-data" action="?/editLocation">
			<Input name="what" value={$event?.info.what} type="text" label="Vad?" />
			<Input name="id" value={selectedLocation?.id} type="hidden" />
			<div>
				<button for="editLocation" class="btn">Spara</button>
				<label for="editLocation" class="btn">Stäng</label>
			</div>
		</form>
	</div>
</div>
