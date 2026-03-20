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

<div class="card overflow-x-auto bg-white p-1">
	<SvelteTable
		rows={teamsWithPoints}
		{columns}
		classNameTable="w-full text-left font-mono text-base text-stone-900 border-collapse"
		classNameThead="text-xs text-stone-600 uppercase tracking-widest bg-brand-100 border-b-4 border-stone-900 [&_th]:px-4 [&_th]:py-3 [&_th]:font-black"
		classNameRow="bg-white border-b-2 border-stone-200 hover:bg-brand-50 transition-colors font-bold"
		classNameCell="px-4 py-3 sm:py-4"
	/>
</div>
