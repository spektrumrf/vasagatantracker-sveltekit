<script lang="ts">
	import { feats } from '$lib/stores';
	import SvelteTable from 'svelte-table';

	const columns = [
		{
			key: 'team',
			title: 'Lagnamn',
			value: (v) => v.expand.team.name,
			filterOptions: [...new Set($feats.map((f) => f.expand.team.name))]
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
			filterOptions: [true, false]
		}
	];
</script>

<div class="overfull-x-auto">
	<SvelteTable
		rows={$feats}
		{columns}
		classNameTable="table table-compact"
		classNameSelect="select select-sm"
	/>
</div>
