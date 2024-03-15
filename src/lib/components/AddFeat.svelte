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
		class="btn btn-primary border border-black text-xl mb-8 w-full max-w-sm mx-auto"
		>Ny prestation</label
	>
</div>
<input type="checkbox" id="addFeat" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box flex">
		<div class="mx-auto">
			<h3 class="font-bold text-xl">Ny prestation</h3>
			<form
				on:submit={() => (loading = true)}
				method="POST"
				id="add-form"
				enctype="multipart/form-data"
				action={formActionPath}
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

				<div class="form-control w-full max-w-xs">
					<label class="label" for="location">
						<span class="label-text">Plats</span>
						<span class="label-text-alt">Specialkrogar märkta med *</span>
					</label>
					<select name="location" required bind:value={locationId} class="select select-bordered">
						<option disabled selected value="">Välj plats</option>
						{#each $locations as location}
							<option value={location.id}>{location.name}</option>
						{/each}
					</select>
				</div>

				<div class="form-control w-full max-w-xs">
					<label class="label" for="proofs">
						<span class="label-text">Välj bildbevis</span>
					</label>
					<input
						type="file"
						name="proofs"
						required
						multiple
						class="file-input file-input-secondary file-input-sm file-input-bordered w-full max-w-xs"
					/>
				</div>

				<Input name="teamComment" type="text" label="Kommentar" altLabel="" />
				<input hidden value={$event?.id} name="event" />
				<input hidden value={locationName} name="locationName" />
				<div class="flex gap-3 mt-3">
					<button class="btn btn-primary">
						<Loading {loading}>Spara</Loading>
					</button>
					<label for="addFeat" class="btn">Stäng</label>
				</div>
			</form>
		</div>
	</div>
</div>
