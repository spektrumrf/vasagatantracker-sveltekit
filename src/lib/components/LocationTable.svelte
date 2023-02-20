<script lang="ts">
	import { locations, feats } from '$lib/stores';
	import SvelteTable from 'svelte-table';

	const columns = [
		{
			key: 'name',
			title: 'Namn',
			value: (v) => v.name,
			sortable: true
		},
		{
			key: 'points',
			title: 'Poäng',
			value: (v) => v.points,
			sortable: true
		}
	];

	$: locationsWithPoints = $locations.map((l) => ({
		points: $feats
			.filter((f) => f.approved)
			.reduce((sum, f) => (f.location === l.id ? sum + f.points : sum), 0),
		...l
	}));
</script>

<div class="overfull-x-auto">
	<SvelteTable rows={locationsWithPoints} {columns} classNameTable="table table-compact" />
</div>
