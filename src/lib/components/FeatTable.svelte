<script lang="ts">
	import { feats, account, type Feat, Role } from '$lib/stores';
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
			value: (v) => v.expand.location.name,
			filterOptions: [...new Set($feats.map((f) => f.expand.location.name))]
		},
		{
			key: 'points',
			title: 'Poäng',
			value: (v) => v.points,
			sortable: true
		},
		{
			key: 'created',
			title: 'Tid',
			value: (v) => v.created,
			renderValue: (v) => `kl. ${new Date(v.created).toLocaleTimeString('fi-FI')}`,
			sortable: true
		},
		{
			key: 'approved',
			title: 'Godkänd',
			value: (v) => v.approved,
			renderValue: (v) => (v.approved ? 'Ja' : 'Nej'),
			filterOptions: ['Ja', 'Nej'],
			filterValue: (v) => (v.approved ? 'Ja' : 'Nej')
		}
	];
	let selectedFeat: Feat;
</script>

<div class="overfull-x-auto">
	<SvelteTable
		rows={$feats}
		{columns}
		classNameTable="table table-compact"
		classNameSelect="select select-sm"
		on:clickRow={(e) => {
			const row = e.detail.row;
			selectedFeat = selectedFeat?.id === row.id ? null : row;
		}}
	/>
</div>
{#if !$account || $account.role === Role.TEAM}
	<FeatView feat={selectedFeat} isOpen={!!selectedFeat} />
{:else if selectedFeat}
	<EditFeat feat={selectedFeat} modalOpen={!!selectedFeat} />
{/if}
