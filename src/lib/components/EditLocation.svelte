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
	<div>
		<label for="editLocation" class="my-5 btn-primary inline-block cursor-pointer">Editera</label>
	</div>
	<div class="my-5 rounded-lg border border-stone-200 bg-stone-50 p-4">
		<form method="POST" on:submit={onDeleteSubmit} action="?/deleteLocation">
			<div class="flex gap-3">
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
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="editLocation" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-4 max-h-[90vh] w-full max-w-lg scale-95 transform overflow-y-auto rounded-xl bg-white p-6 shadow-xl transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-6 font-serif text-2xl font-bold text-brand-900">Editera plats</h3>
		<form
			method="POST"
			enctype="multipart/form-data"
			action="?/editLocation"
			on:submit={() => (editLoading = true)}
			class="space-y-4"
		>
			<Input name="name" value={selectedLocation?.name || ''} type="text" label="Platsens namn" />
			<Input name="id" value={selectedLocation?.id} type="hidden" />

			<div class="mt-6 flex gap-3 border-t border-stone-100 pt-4">
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
