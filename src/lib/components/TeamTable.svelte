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

<div class="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
	<div class="overflow-x-auto">
		<SvelteTable
			rows={teamsWithPoints}
			{columns}
			classNameTable="w-full text-left text-sm text-stone-700 border-collapse"
			classNameThead="text-xs text-stone-500 uppercase tracking-wider bg-stone-50 border-b border-stone-200 [&_th]:px-4 [&_th]:py-3"
			classNameRow="bg-white border-b border-stone-100 hover:bg-stone-50 transition-colors"
			classNameCell="px-4 py-3 sm:py-4 font-medium"
		/>
	</div>
</div>
