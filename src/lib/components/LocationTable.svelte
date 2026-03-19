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

<div class="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
	<div class="overflow-x-auto">
		<SvelteTable
			rows={locationsWithPoints}
			{columns}
			classNameTable="w-full text-left text-sm text-stone-700 border-collapse"
			classNameThead="text-xs text-stone-500 uppercase tracking-wider bg-stone-50 border-b border-stone-200 [&_th]:px-4 [&_th]:py-3"
			classNameRow="bg-white border-b border-stone-100 hover:bg-stone-50 transition-colors"
			classNameCell="px-4 py-3 sm:py-4 font-medium"
		/>
	</div>
</div>
