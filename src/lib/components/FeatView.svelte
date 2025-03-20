<script lang="ts">
	import type { Feat } from '$lib/stores';
	import { FeatContent, locations } from '$lib/stores';
	import Input from './Input.svelte';

	export let feat: Feat | null;
	export let isOpen = false;
</script>

{#if feat}
	<div class={`modal modal-bottom sm:modal-middle ${isOpen && 'modal-open'}`}>
		<div class="modal-box flex">
			<div class="mx-auto">
				<h3 class="font-bold text-2xl mb-2">Prestation</h3>
				<Input name="points" value={feat.points} type="number" label="Poäng" disabled={true} />

				<div class="form-control w-full max-w-xs">
					<label class="label" for="content">
						<span class="label-text">Innehåll</span>
					</label>
					<div class="grid grid-cols-3">
						{#each Object.values(FeatContent) as type}
							<div>
								<label class="label" for={type}>
									<span class="label-text">{type}</span>
								</label>
								<select disabled name={type} class="select select-bordered">
									{#each [...Array(10).keys()] as i}
										<option value={i}>{i}</option>
									{/each}
								</select>
							</div>
						{/each}
					</div>
				</div>
				<div class="form-control w-full max-w-xs">
					<label class="label" for="location">
						<span class="label-text">Plats</span>
						<span class="label-text-alt">Specialkrogar märkta med *</span>
					</label>
					<select
						name="location"
						class="select select-bordered"
						bind:value={feat.location}
						disabled
					>
						<option disabled>Välj plats</option>
						{#each $locations as location}
							<option value={location.id}>{location.name}</option>
						{/each}
					</select>
				</div>

				<div class="form-control w-full max-w-xs">
					<label for="proofs" class="label">
						<span class="label-text"> Bevis</span>
					</label>
					{#each feat.proofUrls as url, i}
						<a
							target="_blank"
							class="btn btn-secondary btn-sm ml-2 my-2"
							rel="noreferrer"
							href={url}>Bild {i + 1}</a
						>
					{/each}
				</div>

				<Input
					value={feat.teamComment}
					name="teamComment"
					type="text"
					label="Lagkommentar"
					altLabel=""
					disabled={true}
				/>
				<Input
					value={feat.adminComment}
					name="adminComment"
					type="text"
					label="Domarkommentar"
					altLabel=""
					disabled={true}
				/>
				<div>
					<button on:click={() => (isOpen = false)} class="btn my-2">Stäng</button>
				</div>
			</div>
		</div>
	</div>
{/if}
