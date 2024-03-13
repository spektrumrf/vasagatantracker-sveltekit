<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import type { Location } from '$lib/stores';
	import { event } from '$lib/stores';
	export let selectedLocation: Location | null = null;
</script>

{#if selectedLocation}
	<div>
		<label for="editLocation" class="btn btn-primary my-5 max-w-xs">Editera</label>
	</div>
	<div class="my-5">
		<form
			method="POST"
			onsubmit="return confirm('Är du säker att du vill radera platsen? Prestationer i platsen raderas också.')"
			action="?/deleteLocation"
		>
			<div class="flex gap-3">
				<input type="hidden" name="id" value={selectedLocation?.id} />
				<input hidden name="eventId" value={$event?.id} />
				<button class="btn btn-error" data-testid="deleteLocation">Radera</button>
			</div>
		</form>
	</div>
{/if}
<input type="checkbox" id="editLocation" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box flex">
		<div class="mx-auto">
			<h3 class="font-bold text-2xl">Editera plats</h3>
			<form method="POST" enctype="multipart/form-data" action="?/editLocation">
				<Input name="name" value={selectedLocation?.name || ''} type="text" label="Platsens namn" />
				<Input name="id" value={selectedLocation?.id} type="hidden" />
				<div class="flex gap-3">
					<button class="btn btn-primary">Spara</button>
					<label for="editLocation" class="btn">Stäng</label>
				</div>
			</form>
		</div>
	</div>
</div>
