<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event, feats, locations } from '$lib/stores';
</script>

{#each $feats as feat}
	<div>{feat.points}</div>
{/each}

<label for="addFeat" class="btn">Ny prestation</label>

<input type="checkbox" id="addFeat" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Ny prestation</h3>
		<form method="POST" enctype="multipart/form-data" action="?/add">
			<Input name="points" type="number" label="Poäng" altLabel="0-15, 0 om osäker" />

			<div class="form-control w-full max-w-xs">
				<label class="label" for="location">
					<span class="label-text">Plats</span>
					<span class="label-text-alt">Specialkrogar märkta med *</span>
				</label>
				<select name="location" class="select select-bordered">
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
				<input type="file" name="proofs" class="file-input file-input-bordered w-full max-w-xs" />
			</div>

			<Input name="teamComment" type="text" label="Kommentar" />
			<input hidden value={$event?.id} name="event" />
			<div>
				<button for="addFeat" class="btn">Spara</button>
				<label for="addFeat" class="btn">Stäng</label>
			</div>
		</form>
	</div>
</div>
