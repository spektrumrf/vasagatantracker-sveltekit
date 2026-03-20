<script lang="ts">
	import { feats, account, type Feat, Role, featFilterSelections } from '$lib/stores';
	import FeatView from '$lib/components/FeatView.svelte';
	import EditFeat from '$lib/components/EditFeat.svelte';
	import SvelteTable from 'svelte-table';
	import { Filter, X } from 'lucide-svelte';

	const columns = [
		{
			key: 'team',
			title: 'Lagnamn',
			value: (v: Feat) => v.expand?.team?.name,
			hideFilterHeader: true
		},
		{
			key: 'location',
			title: 'Plats',
			value: (v: Feat) => v.expand?.location?.name,
			hideFilterHeader: true
		},
		{
			key: 'created',
			title: 'Tid',
			value: (v: Feat) => v.created,
			renderValue: (v: Feat) =>
				`${new Date(v.created).toLocaleTimeString('sv-FI', { timeZone: 'Europe/Helsinki' }).slice(0, 5)}`,
			sortable: true,
			hideFilterHeader: true
		},
		{
			key: 'approved',
			title: 'OK',
			value: (v: Feat) => (v.approved ? 'Ja' : 'Nej'),
			renderValue: (v: Feat) => (v.approved ? 'Ja' : 'Nej'),
			filterValue: (v: Feat) => (v.approved ? 'Ja' : 'Nej'),
			hideFilterHeader: true
		},
		{
			key: 'checked',
			title: 'Granskad',
			value: (v: Feat) => (v.checked ? 'Ja' : 'Nej'),
			renderValue: (v: Feat) => (v.checked ? '✓' : ''),
			filterValue: (v: Feat) => (v.checked ? 'Ja' : 'Nej'),
			hideFilterHeader: true
		}
	];
	let selectedFeat: Feat | null;

	$: uniqueTeams = [...new Set($feats.map((f) => f.expand?.team?.name).filter(Boolean))].sort();
	$: uniqueLocations = [
		...new Set($feats.map((f) => f.expand?.location?.name).filter(Boolean))
	].sort();

	// Ensure filter selections are properly typed and defaults exist
	$: {
		if (!$featFilterSelections) $featFilterSelections = {};
	}

	export let title: string = '';

	let showFilters = false;
	$: activeFiltersCount = Object.values($featFilterSelections).filter(
		(v) => v !== undefined && v !== null
	).length;
</script>

<div class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
	<h3 class="font-mono text-3xl font-black tracking-tighter text-brand-900 uppercase">
		{title}
	</h3>

	<div
		class="flex shrink-0 items-center overflow-hidden border-4 border-stone-900 bg-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-all"
	>
		<button
			on:click={() => (showFilters = !showFilters)}
			class={`flex h-10 items-center gap-2 px-4 font-mono text-sm font-black tracking-wider uppercase transition-colors focus:outline-none ${showFilters ? 'bg-brand-500 text-white' : 'bg-white text-stone-900 hover:bg-stone-100'}`}
		>
			<Filter size={18} strokeWidth={3} />
			FILTRERA {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
		</button>

		{#if activeFiltersCount > 0}
			<div class="h-10 w-1 bg-stone-900"></div>
			<button
				aria-label="Rensa filter"
				title="Rensa filter"
				class="flex h-10 w-10 items-center justify-center bg-red-500 text-white transition-colors hover:bg-red-600 focus:outline-none focus-visible:bg-red-600"
				on:click={() => ($featFilterSelections = {})}
			>
				<X size={20} strokeWidth={4} />
			</button>
		{/if}
	</div>
</div>

{#if showFilters}
	<div class="mb-8 card bg-stone-50 p-4 transition-all">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#if $account?.role !== Role.TEAM}
				<div>
					<label
						for="filter-team"
						class="mb-2 block font-mono text-xs font-bold tracking-widest text-stone-900 uppercase"
						>Filtrera lag</label
					>
					<select
						id="filter-team"
						class="input-field py-1.5 text-sm"
						bind:value={$featFilterSelections.team}
					>
						<option value={undefined}>Alla lag</option>
						{#each uniqueTeams as team}
							<option value={team}>{team}</option>
						{/each}
					</select>
				</div>
			{/if}

			<div>
				<label
					for="filter-location"
					class="mb-2 block font-mono text-xs font-bold tracking-widest text-stone-900 uppercase"
					>Filtrera plats</label
				>
				<select
					id="filter-location"
					class="input-field py-1.5 text-sm"
					bind:value={$featFilterSelections.location}
				>
					<option value={undefined}>Alla platser</option>
					{#each uniqueLocations as location}
						<option value={location}>{location}</option>
					{/each}
				</select>
			</div>

			<div>
				<label
					for="filter-approved"
					class="mb-2 block font-mono text-xs font-bold tracking-widest text-stone-900 uppercase"
					>Godkänd status</label
				>
				<select
					id="filter-approved"
					class="input-field py-1.5 text-sm"
					bind:value={$featFilterSelections.approved}
				>
					<option value={undefined}>Alla</option>
					<option value="Ja">Ja</option>
					<option value="Nej">Nej</option>
				</select>
			</div>

			<div>
				<label
					for="filter-checked"
					class="mb-2 block font-mono text-xs font-bold tracking-widest text-stone-900 uppercase"
					>Granskad status</label
				>
				<select
					id="filter-checked"
					class="input-field py-1.5 text-sm"
					bind:value={$featFilterSelections.checked}
				>
					<option value={undefined}>Alla</option>
					<option value="Ja">Ja</option>
					<option value="Nej">Nej</option>
				</select>
			</div>
		</div>
	</div>
{/if}

<div class="card overflow-x-auto bg-white p-1">
	<SvelteTable
		rows={$feats}
		{columns}
		classNameTable="w-full text-left font-mono text-base text-stone-900 border-collapse min-w-[600px]"
		classNameThead="text-xs text-stone-600 uppercase tracking-widest bg-brand-100 border-b-4 border-stone-900 [&_th]:px-4 [&_th]:py-3 [&_th]:font-black"
		classNameRow="bg-white border-b-2 border-stone-200 hover:bg-brand-50 transition-colors cursor-pointer group font-bold"
		classNameCell="px-4 py-3 truncate max-w-[150px] sm:max-w-none"
		on:clickRow={(e) => {
			selectedFeat = e.detail.row;
		}}
		bind:filterSelections={$featFilterSelections}
	/>
</div>
{#if !$account || $account.role === Role.TEAM}
	<FeatView feat={selectedFeat} isOpen={!!selectedFeat} on:close={() => (selectedFeat = null)} />
{:else if selectedFeat}
	<EditFeat feat={selectedFeat} modalOpen={!!selectedFeat} on:close={() => (selectedFeat = null)} />
{/if}
