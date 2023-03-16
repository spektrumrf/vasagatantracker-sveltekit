<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event, locations } from '$lib/stores';
	export let form: any;
	export let constraints: any;
	let locationId = "";
	$: locationName = $locations.find(l => l.id === locationId)?.name
</script>

<div class="flex">
	<label for="addFeat" class="btn btn-primary mb-8 w-full max-w-sm mx-auto">Ny prestation</label>
</div>
<input type="checkbox" id="addFeat" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box flex">
		<div class="mx-auto">
			<h3 class="font-bold text-xl">Ny prestation</h3>
			<form method="POST" id="add-form" enctype="multipart/form-data" action="?/add">
				<Input name="points" type="number" label="Poäng" altLabel="0-15, 0 om osäker" constraints={$constraints.points} />

				<div class="form-control w-full max-w-xs">
					<label class="label" for="location">
						<span class="label-text">Plats</span>
						<span class="label-text-alt">Specialkrogar märkta med *</span>
					</label>
					<select name="location" on:change={(e) => locationId = e.target.value} class="select select-bordered" {...$constraints.location} value={$form.location}>
						<option disabled selected>Välj plats</option>
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
						class="file-input file-input-secondary file-input-sm file-input-bordered w-full max-w-xs"
					/>
				</div>

				<Input name="teamComment" type="text" label="Kommentar" altLabel="" constraints={$constraints.teamComment} />
				<input hidden value={$event?.id} name="event" />
				<input hidden value={locationName} name="locationName" />
				<div class="flex gap-3 mt-3">
					<button class="btn btn-primary">Spara</button>
					<label for="addFeat" class="btn">Stäng</label>
				</div>
			</form>
		</div>
	</div>
</div>
