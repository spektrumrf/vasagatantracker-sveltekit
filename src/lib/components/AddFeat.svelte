<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { event, locations } from '$lib/stores';
	export let formActionPath = '?/add';
	let locationId = '';
	let loading: boolean = false;
	$: locationName = $locations.find((l) => l.id === locationId)?.name;
</script>

<div class="flex">
	<label
		for="addFeat"
		class="mx-auto mb-8 btn-primary w-full max-w-sm cursor-pointer px-6 py-3 text-center text-lg shadow-md transition-all hover:shadow-lg sm:text-xl"
		>Ny prestation</label
	>
</div>

<!-- Add Feat Modal -->
<input type="checkbox" id="addFeat" class="peer hidden" />
<div
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="addFeat" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-auto max-h-[90vh] w-full max-w-lg scale-95 transform overflow-y-auto rounded-xl bg-white p-6 shadow-xl transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-6 font-serif text-2xl font-bold text-brand-900">Ny prestation</h3>
		<form
			on:submit={() => (loading = true)}
			method="POST"
			id="add-form"
			enctype="multipart/form-data"
			action={formActionPath}
			class="space-y-5"
		>
			<Input
				name="points"
				type="number"
				label="Poäng"
				required={true}
				min={0}
				max={15}
				step="0.01"
				altLabel="0-15, 0 om osäker"
			/>

			<div class="w-full">
				<div class="mb-1 flex items-end justify-between">
					<label class="block text-sm font-medium text-stone-700" for="location"> Plats </label>
					<span class="text-xs text-stone-500">Specialkrogar märkta med *</span>
				</div>
				<select name="location" required bind:value={locationId} class="input-field">
					<option disabled selected value="">Välj plats</option>
					{#each $locations as location}
						<option value={location.id}>{location.name}</option>
					{/each}
				</select>
			</div>

			<div class="w-full">
				<label class="mb-2 block text-sm font-medium text-stone-700" for="proofs">
					Välj bildbevis
				</label>
				<input
					type="file"
					name="proofs"
					id="proofs"
					required
					multiple
					class="block w-full rounded-md border
					border-stone-300 p-1 text-sm
					text-stone-500 transition-colors
					file:mr-4 file:rounded-md
					file:border-0 file:bg-brand-50
					file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100"
				/>
			</div>

			<Input name="teamComment" type="text" label="Kommentar" altLabel="" />
			<input hidden value={$event?.id} name="event" />
			<input hidden value={locationName} name="locationName" />

			<div class="mt-6 flex gap-3 border-t border-stone-100 pt-6">
				<button class="btn-primary flex-1">
					<Loading {loading}>Spara</Loading>
				</button>
				<label for="addFeat" class="btn-secondary flex-1 cursor-pointer text-center">Stäng</label>
			</div>
		</form>
	</div>
</div>
