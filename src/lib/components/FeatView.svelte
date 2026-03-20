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
		class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-sm transition-opacity duration-200"
	>
		<div
			on:click|stopPropagation
			class="relative max-h-[90vh] w-full max-w-lg transform overflow-y-auto border-4 border-stone-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-transform duration-200 sm:p-8"
		>
			<div class="mb-8 flex items-center justify-between border-b-4 border-stone-100 pb-4">
				<h3 class="font-mono text-2xl font-black tracking-tight text-brand-900 uppercase">
					Prestation
				</h3>
				<button
					aria-label="Stäng"
					on:click={close}
					class="text-stone-900 transition-transform hover:scale-110 active:scale-95"
				>
					<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="square"
							stroke-linejoin="miter"
							stroke-width="3"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="space-y-6">
				<Input name="points" value={feat.points} type="number" label="Poäng" disabled={true} />

				<div class="w-full">
					<label
						class="mb-2 block font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
						for="content"
					>
						Innehåll
					</label>
					<div class="grid grid-cols-3 gap-3">
						{#each Object.values(FeatContent) as type}
							<div>
								<label
									class="mb-1 block font-mono text-xs font-bold tracking-widest text-brand-600 uppercase"
									for={type}
								>
									{type}
								</label>
								<select disabled name={type} class="input-field px-2 py-1 text-sm">
									{#each [...Array(10).keys()] as i}
										<option value={i}>{i}</option>
									{/each}
								</select>
							</div>
						{/each}
					</div>
				</div>

				<div class="w-full">
					<div class="mb-2 flex items-end justify-between">
						<label
							class="block font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
							for="location"
						>
							Plats
						</label>
						<span class="font-mono text-xs font-bold tracking-widest text-brand-600 uppercase"
							>Specialkrogar märkta med *</span
						>
					</div>
					<select name="location" class="input-field" bind:value={feat.location} disabled>
						<option disabled>Välj plats</option>
						{#each $locations as location}
							<option value={location.id}>{location.name}</option>
						{/each}
					</select>
				</div>

				<div class="w-full pt-2">
					<div
						class="mb-2 block font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
					>
						Bevis
					</div>
					<div class="flex flex-wrap gap-2">
						{#if feat.proofUrls && feat.proofUrls.length > 0}
							{#each feat.proofUrls as url, i}
								<a
									target="_blank"
									class="btn-secondary px-3 py-1.5 text-xs"
									rel="noreferrer"
									href={url}>Bild {i + 1}</a
								>
							{/each}
						{:else}
							<span class="font-mono text-sm font-bold text-stone-500 uppercase"
								>Inga bevis uppladdade</span
							>
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

				<div class="mt-8 border-t-4 border-stone-100 pt-8">
					<button on:click={close} class="btn-secondary w-full">Stäng</button>
				</div>
			</div>
		</div>
	</div>
{/if}
