<script lang="ts">
	import { locations, feats } from '$lib/stores';
	import SvelteTable from 'svelte-table';

	const columns = [
		{
			key: 'name',
			title: 'Namn',
			value: (v: LocationWithPoints) => v.name,
			sortable: true
		},
		{
			key: 'points',
			title: 'Poäng',
			value: (v: LocationWithPoints) => v.points,
			sortable: true
		}
	];

	$: locationsWithPoints = $locations.map((l) => ({
		points: $feats
			.filter((f) => f.approved)
			.reduce((sum, f) => (f.location === l.id ? sum + f.points : sum), 0),
		...l
	}));
	interface LocationWithPoints {
		name: string;
		points: number;
	}
</script>

<div class="overfull-x-auto rounded-lg border-2 border-primary">
	<SvelteTable
		rows={locationsWithPoints}
		{columns}
		classNameTable="table table-sm"
		classNameThead="bg-primary"
	/>
</div>
