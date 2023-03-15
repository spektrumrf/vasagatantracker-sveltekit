<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { locations, FeatContent } from '$lib/stores';
	export let modalOpen = false;
	export let feat: any = {};
	$: content = feat.content || {};
	let approved: boolean = !!feat.approved;
</script>

<div class={`modal modal-bottom sm:modal-middle ${modalOpen ? 'modal-open' : ''}`}>
	<div class="modal-box flex">
		<div class="mx-auto">
			<h3 class="font-bold text-2xl mb-2">Editera prestation</h3>
			<form method="POST" name="editFeat" enctype="multipart/form-data" action="?/edit">
				<Input
					name="points"
					value={feat.points}
					type="number"
					label="Poäng"
				/>

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
								<select
									name={type}
									on:change={(e) => (content[type] = e.target?.value)}
									class="select select-bordered"
								>
									{#each [...Array(10).keys()] as i}
										<option value={i} selected={content[type] === i}>{i}</option>
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
					<select name="location" class="select select-bordered">
						<option disabled>Välj plats</option>
						{#each $locations as location}
							<option selected={location.id === feat.location} value={location.id}
								>{location.name}</option
							>
						{/each}
					</select>
				</div>

				<div class="form-control w-full max-w-xs">
					<label for="proofs" class="label">
						<span class="label-text"> Bevis</span>
					</label>
					{#each feat.proofUrls as url, i}
						<a target="_blank" class="btn btn-secondary btn-sm ml-2" rel="noreferrer" href={url}
							>Bild {i + 1}</a
						>
					{/each}
				</div>

				<Input
					value={feat.teamComment}
					name="teamComment"
					type="text"
					label="Lagkommentar"
					altLabel=""
				/>
				<Input
					value={feat.adminComment}
					name="adminComment"
					type="text"
					label="Domarkommentar"
					altLabel=""
				/>
				<div class="form-control">
					<label for="approved" class="label cursor-pointer">
						<span class="label-text">Godkänd</span>
					</label>
					<input
						type="checkbox"
						name="approved"
						class="toggle"
						value={approved}
						checked={approved}
						on:change={() => (approved = !approved)}
					/>
				</div>
				<input hidden value={feat?.id} type="text" name="id" />
				<div class="flex gap-3 py-5">
					<button class="btn btn-primary">Spara</button>
					<label
						for="editFeat"
						class="btn"
						on:keypress={() => (modalOpen = false)}
						on:click={() => (modalOpen = false)}>Stäng</label
					>
				</div>
			</form>
		</div>
	</div>
</div>
