<script lang="ts">
	import { feats, account, type Feat, Role, featFilterSelections } from '$lib/stores';
	import FeatView from '$lib/components/FeatView.svelte';
	import EditFeat from '$lib/components/EditFeat.svelte';
	import SvelteTable from 'svelte-table';

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
</script>

<div class="mb-6 rounded-lg border border-stone-200 bg-stone-50 p-4">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#if $account?.role !== Role.TEAM}
			<div>
				<label
					for="filter-team"
					class="mb-1 block text-xs font-medium tracking-wider text-stone-500 uppercase"
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
				class="mb-1 block text-xs font-medium tracking-wider text-stone-500 uppercase"
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
				class="mb-1 block text-xs font-medium tracking-wider text-stone-500 uppercase"
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
				class="mb-1 block text-xs font-medium tracking-wider text-stone-500 uppercase"
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

<div class="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
	<div class="overflow-x-auto">
		<SvelteTable
			rows={$feats}
			{columns}
			classNameTable="w-full text-left text-sm text-stone-700 border-collapse min-w-[600px]"
			classNameThead="text-xs text-stone-500 uppercase tracking-wider bg-stone-50 border-b border-stone-200 [&_th]:px-4 [&_th]:py-3"
			classNameRow="bg-white border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer group"
			classNameCell="px-4 py-3 truncate max-w-[150px] sm:max-w-none font-medium"
			on:clickRow={(e) => {
				selectedFeat = e.detail.row;
			}}
			bind:filterSelections={$featFilterSelections}
		/>
	</div>
</div>
{#if !$account || $account.role === Role.TEAM}
	<FeatView feat={selectedFeat} isOpen={!!selectedFeat} on:close={() => (selectedFeat = null)} />
{:else if selectedFeat}
	<EditFeat feat={selectedFeat} modalOpen={!!selectedFeat} on:close={() => (selectedFeat = null)} />
{/if}
