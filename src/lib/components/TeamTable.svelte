<script lang="ts">
	import { teams, feats } from '$lib/stores';
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

	$: teamsWithPoints = $teams.map((t) => ({
		points: $feats
			.filter((f) => f.approved)
			.reduce((sum, f) => (f.team === t.id ? sum + f.points : sum), 0),
		...t
	}));
</script>

<div class="overfull-x-auto">
	<SvelteTable rows={teamsWithPoints} {columns} classNameTable="table table-compact" />
</div>
