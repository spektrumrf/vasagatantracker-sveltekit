<script lang="ts">
	import { teams, feats } from '$lib/stores';
	import SvelteTable from 'svelte-table';

	const columns = [
		{
			key: 'name',
			title: 'Namn',
			value: (v: TeamWithPoints) => v.name,
			sortable: true
		},
		{
			key: 'points',
			title: 'Poäng',
			value: (v: TeamWithPoints) => v.points,
			sortable: true
		}
	];

	$: teamsWithPoints = $teams.map((t) => {
		let points =
			$feats
				.filter((f) => f.approved)
				.reduce((sum, f) => (f.team === t.id ? sum + f.points : sum), 0) * t.coefficient;
		return {
			points: Math.round(points * 100) / 100,
			...t
		};
	});

	interface TeamWithPoints {
		name: string;
		points: number;
	}
</script>

<div class="overfull-x-auto rounded-lg border-2 border-primary">
	<SvelteTable
		rows={teamsWithPoints}
		{columns}
		classNameTable="table table-sm"
		classNameThead="bg-primary"
	/>
</div>
