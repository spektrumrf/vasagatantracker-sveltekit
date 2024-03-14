<script lang="ts">
	import { feats, account, type Feat, Role, featFilterSelections } from '$lib/stores';
	import FeatView from '$lib/components/FeatView.svelte';
	import EditFeat from '$lib/components/EditFeat.svelte';
	import SvelteTable from 'svelte-table';

	const columns = [
		{
			key: 'team',
			title: 'Lagnamn',
			value: (v: Feat) => v.expand?.team.name,
			filterOptions: [...new Set($feats.map((f) => f.expand?.team.name))]
		},
		{
			key: 'location',
			title: 'Plats',
			value: (v: Feat) => v.expand?.location.name,
			filterOptions: [...new Set($feats.map((f) => f.expand?.location.name))]
		},
		// {
		// 	key: 'points',
		// 	title: 'Poäng',
		// 	value: (v) => v.points,
		// 	sortable: true
		// },
		{
			key: 'created',
			title: 'Tid',
			value: (v: Feat) => v.created,
			renderValue: (v: Feat) => `${new Date(v.created).toLocaleTimeString('fi-FI').slice(0, 5)}`,
			sortable: true
		},
		{
			key: 'approved',
			title: 'OK',
			value: (v: Feat) => v.approved,
			renderValue: (v: Feat) => (v.approved ? 'Ja' : 'Nej'),
			filterOptions: ['Ja', 'Nej'],
			filterValue: (v: Feat) => (v.approved ? 'Ja' : 'Nej')
		}
	];
	let selectedFeat: Feat | null;
</script>

<div class="overflow-x-auto rounded-lg border-2 border-primary">
	<SvelteTable
		rows={$feats}
		{columns}
		classNameTable="table table-sm w-full"
		classNameThead="bg-primary"
		classNameSelect="select select-bordered select-sm mt-2"
		classNameCell="text-xs lg:text-base"
		on:clickRow={(e) => {
			const row = e.detail.row;
			selectedFeat = selectedFeat?.id === row.id ? null : row;
		}}
		bind:filterSelections={$featFilterSelections}
	/>
</div>
{#if !$account || $account.role === Role.TEAM}
	<FeatView feat={selectedFeat} isOpen={!!selectedFeat} />
{:else if selectedFeat}
	<EditFeat feat={selectedFeat} modalOpen={!!selectedFeat} />
{/if}
