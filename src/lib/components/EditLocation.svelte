<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import type { Location } from '$lib/stores';
	import { event } from '$lib/stores';
	export let selectedLocation: Location | null = null;
	let deleteLoading = false;
	let editLoading = false;

	function onDeleteSubmit(e: Event) {
		deleteLoading = true;
		if (!confirm('Är du säker att du vill radera platsen? Prestationer i platsen raderas också.')) {
			e.preventDefault();
			deleteLoading = false;
		}
	}
</script>

{#if selectedLocation}
	<div class="mt-8 border-t-4 border-stone-900 pt-8 transition-all">
		<h4 class="mb-4 font-mono text-lg font-black text-brand-900 uppercase">
			{selectedLocation.name}
		</h4>
		<form method="POST" on:submit={onDeleteSubmit} action="?/deleteLocation">
			<div class="flex flex-wrap gap-4">
				<label for="editLocation" class="btn-primary cursor-pointer">Editera</label>
				<input type="hidden" name="id" value={selectedLocation?.id} />
				<input hidden name="eventId" value={$event?.id} />
				<button class="btn-danger" data-testid="deleteLocation">
					<Loading loading={deleteLoading}>Radera</Loading>
				</button>
			</div>
		</form>
	</div>
{/if}

<!-- Edit Location Modal -->
<input type="checkbox" id="editLocation" class="peer hidden" />
<div
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="editLocation" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-4 max-h-[90vh] w-full max-w-lg scale-95 transform overflow-y-auto border-4 border-stone-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-8 font-mono text-2xl font-black tracking-tight text-brand-900 uppercase">
			Editera plats
		</h3>
		<form
			method="POST"
			enctype="multipart/form-data"
			action="?/editLocation"
			on:submit={() => (editLoading = true)}
			class="space-y-6"
		>
			<Input name="name" value={selectedLocation?.name || ''} type="text" label="Platsens namn" />
			<Input name="id" value={selectedLocation?.id} type="hidden" />

			<div class="mt-8 flex flex-col gap-4 border-t-4 border-stone-900 pt-8 sm:flex-row">
				<button class="btn-primary flex-1">
					<Loading loading={editLoading}>Spara</Loading>
				</button>
				<label for="editLocation" class="btn-secondary flex-1 cursor-pointer text-center"
					>Stäng</label
				>
			</div>
		</form>
	</div>
</div>
