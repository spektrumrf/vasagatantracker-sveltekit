<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { locations, FeatContent } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	export let modalOpen = false;
	export let feat: any = {};
	const dispatch = createEventDispatcher();
	let content: any = {};
	let approved: boolean;
	let checked: boolean;
	let loading = false;

	function close() {
		dispatch('close');
	}
	$: {
		content = feat.content || {};
		approved = !!feat.approved;
		checked = !!feat.checked;
	}
</script>

{#if modalOpen}
	<div
		on:click={close}
		class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-900/60 p-4 backdrop-blur-sm"
	>
		<div
			on:click|stopPropagation
			class="relative my-auto w-full max-w-lg border-4 border-stone-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] sm:p-8"
		>
			<div class="mb-8 flex items-center justify-between border-b-4 border-stone-900 pb-4">
				<h3 class="font-mono text-2xl font-black tracking-tight text-brand-900 uppercase">
					Editera prestation
				</h3>
				<button
					aria-label="Stäng"
					type="button"
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

			<form
				method="POST"
				name="editFeat"
				enctype="multipart/form-data"
				action="?/edit"
				on:submit={() => {
					loading = true;
				}}
				class="space-y-6"
			>
				<Input name="points" value={feat.points} type="number" label="Poäng" step="0.01" />

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
								<select
									name={type}
									on:change={(e) => (content[type] = (e.target as HTMLSelectElement)?.value)}
									class="input-field px-2 py-1 text-sm"
								>
									{#each [...Array(10).keys()] as i}
										<option value={i} selected={content[type] == i}>{i}</option>
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
					<select name="location" class="input-field">
						<option disabled>Välj plats</option>
						{#each $locations as location}
							<option selected={location.id === feat.location} value={location.id}
								>{location.name}</option
							>
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
					/>
				</div>

				<div>
					<Input
						value={feat.adminComment}
						name="adminComment"
						type="text"
						label="Domarkommentar"
						altLabel=""
					/>
				</div>

				<div class="flex flex-col gap-4 pt-2 sm:flex-row">
					<div
						class="flex flex-1 items-center border-4 border-stone-900 bg-white p-3 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"
					>
						<input
							id="approved"
							type="checkbox"
							name="approved"
							class="h-6 w-6 rounded-none border-4 border-stone-900 text-green-600 focus:ring-green-500"
							value={approved.toString()}
							checked={approved}
							on:change={() => (approved = !approved)}
						/>
						<label
							for="approved"
							class="ml-3 block w-full cursor-pointer font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
						>
							Godkänd
						</label>
					</div>
					<div
						class="flex flex-1 items-center border-4 border-stone-900 bg-white p-3 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"
					>
						<input
							id="checked"
							type="checkbox"
							name="checked"
							class="h-6 w-6 rounded-none border-4 border-stone-900 text-blue-600 focus:ring-blue-500"
							value={checked.toString()}
							{checked}
							on:change={() => (checked = !checked)}
						/>
						<label
							for="checked"
							class="ml-3 block w-full cursor-pointer font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
						>
							Granskad
						</label>
					</div>
				</div>

				<input hidden value={feat?.id} type="text" name="id" />

				<div class="mt-8 flex flex-col gap-4 border-t-4 border-stone-900 pt-8 sm:flex-row">
					<button class="btn-primary flex-1">
						<Loading {loading}>Spara</Loading>
					</button>
					<button class="btn-secondary flex-1" type="button" on:click={close}>Stäng</button>
				</div>
			</form>
		</div>
	</div>
{/if}
