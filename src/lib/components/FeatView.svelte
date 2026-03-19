<script lang="ts">
	import type { Feat } from '$lib/stores';
	import { FeatContent, locations } from '$lib/stores';
	import Input from './Input.svelte';

	import { createEventDispatcher } from 'svelte';
	export let feat: Feat | null;
	export let isOpen = false;

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
</script>

{#if feat && isOpen}
	<div
		on:click={close}
		class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-sm transition-opacity duration-200"
	>
		<div
			on:click|stopPropagation
			class="relative max-h-[90vh] w-full max-w-lg transform overflow-y-auto rounded-xl bg-white p-6 shadow-xl transition-transform duration-200 sm:p-8"
		>
			<div class="mb-6 flex items-center justify-between border-b border-stone-100 pb-4">
				<h3 class="font-serif text-2xl font-bold text-brand-900">Prestation</h3>
				<button
					aria-label="Stäng"
					on:click={close}
					class="text-stone-400 hover:text-stone-600 focus:outline-none"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="space-y-4">
				<Input name="points" value={feat.points} type="number" label="Poäng" disabled={true} />

				<div class="w-full">
					<label class="mb-2 block text-sm font-medium text-stone-700" for="content">
						Innehåll
					</label>
					<div class="grid grid-cols-3 gap-3">
						{#each Object.values(FeatContent) as type}
							<div>
								<label class="mb-1 block text-xs text-stone-500" for={type}>
									{type}
								</label>
								<select disabled name={type} class="input-field px-2 py-1">
									{#each [...Array(10).keys()] as i}
										<option value={i}>{i}</option>
									{/each}
								</select>
							</div>
						{/each}
					</div>
				</div>

				<div class="w-full">
					<div class="mb-1 flex items-end justify-between">
						<label class="block text-sm font-medium text-stone-700" for="location"> Plats </label>
						<span class="text-xs text-stone-500">Specialkrogar märkta med *</span>
					</div>
					<select name="location" class="input-field" bind:value={feat.location} disabled>
						<option disabled>Välj plats</option>
						{#each $locations as location}
							<option value={location.id}>{location.name}</option>
						{/each}
					</select>
				</div>

				<div class="w-full pt-2">
					<div class="mb-2 block text-sm font-medium text-stone-700">Bevis</div>
					<div class="flex flex-wrap gap-2">
						{#if feat.proofUrls && feat.proofUrls.length > 0}
							{#each feat.proofUrls as url, i}
								<a
									target="_blank"
									class="inline-flex items-center rounded border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 shadow-sm hover:bg-stone-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:outline-none"
									rel="noreferrer"
									href={url}>Bild {i + 1}</a
								>
							{/each}
						{:else}
							<span class="text-sm text-stone-500 italic">Inga bevis uppladdade</span>
						{/if}
					</div>
				</div>

				<div class="pt-2">
					<Input
						value={feat.teamComment}
						name="teamComment"
						type="text"
						label="Lagkommentar"
						altLabel=""
						disabled={true}
					/>
				</div>

				<div>
					<Input
						value={feat.adminComment}
						name="adminComment"
						type="text"
						label="Domarkommentar"
						altLabel=""
						disabled={true}
					/>
				</div>

				<div class="mt-6 border-t border-stone-100 pt-6">
					<button on:click={close} class="btn-secondary w-full">Stäng</button>
				</div>
			</div>
		</div>
	</div>
{/if}
