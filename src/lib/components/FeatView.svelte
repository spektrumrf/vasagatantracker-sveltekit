<script lang="ts">
	import type { Feat } from '$lib/stores';

	export let feat: Feat;
	export let isOpen = false;
</script>

{#if feat}
	<div class={`modal modal-bottom sm:modal-middle ${isOpen && 'modal-open'}`}>
		<div class="modal-box">
			<h3 class="font-bold text-lg">Prestation</h3>
			<div class="form-control w-full max-w-xs">
				<label for="points" class="label"> Poäng </label>
				{feat.points}
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="location" class="label"> Plats </label>
				{feat.expand?.location.name}
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="teamComment" class="label"> Lagkommentar </label>
				{feat.teamComment}
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="proofs" class="label"> Bevis </label>
				{#each feat.proofUrls as url, i}
					<a target="_blank" rel="noreferrer" href={url}>Bild {i + 1}</a>
				{/each}
			</div>
			<div>
				<button on:click={() => (isOpen = false)} for="feat" class="btn">Stäng</button>
			</div>
		</div>
	</div>
{/if}
