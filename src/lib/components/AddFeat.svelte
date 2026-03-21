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
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="addFeat" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-auto max-h-[90vh] w-full max-w-lg overflow-y-auto border-4 border-stone-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-8 font-mono text-2xl font-black tracking-tight text-brand-900 uppercase">
			Ny prestation
		</h3>
		<form
			on:submit={() => (loading = true)}
			method="POST"
			id="add-form"
			enctype="multipart/form-data"
			action={formActionPath}
			class="space-y-6"
		>
			<Input
				name="points"
				type="number"
				label="Poäng"
				required={true}
				min={0}
				max={15}
				step="0.01"
				inputmode="decimal"
				description="Ange 0-15 poäng. Lämna som 0 om du är osäker."
			/>

			<div class="w-full">
				<div class="mb-2 flex items-end justify-between">
					<label
						class="block font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
						for="location"
					>
						Plats
					</label>
					<span class="font-mono text-xs font-black tracking-widest text-brand-600 uppercase"
						>Specialkrogar *</span
					>
				</div>
				<select name="location" required bind:value={locationId} class="input-field">
					<option disabled selected value="">Välj plats</option>
					{#each $locations as location}
						<option value={location.id}>{location.name}</option>
					{/each}
				</select>
			</div>

			<div class="w-full">
				<label
					class="mb-2 block font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
					for="proofs"
				>
					Välj bildbevis
				</label>
				<input
					type="file"
					name="proofs"
					id="proofs"
					required
					multiple
					class="block w-full border-4 border-stone-900 bg-white p-1 font-mono text-sm text-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-colors
					file:mr-4 file:border-y-0 file:border-r-4 file:border-l-0 file:border-stone-900 file:bg-brand-500
					file:px-4 file:py-2 file:font-mono file:text-sm file:font-bold file:tracking-wider file:text-white file:uppercase hover:file:bg-brand-600 focus:outline-none"
				/>
			</div>

			<Input name="teamComment" type="text" label="Kommentar" />
			<input hidden value={$event?.id} name="event" />
			<input hidden value={locationName} name="locationName" />

			<div class="mt-8 flex flex-col gap-4 border-t-4 border-stone-900 pt-8 sm:flex-row">
				<button class="btn-primary flex-1">
					<Loading {loading}>Spara</Loading>
				</button>
				<label for="addFeat" class="btn-secondary flex-1 cursor-pointer text-center">Stäng</label>
			</div>
		</form>
	</div>
</div>
