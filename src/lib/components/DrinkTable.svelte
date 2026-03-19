<script lang="ts">
	import SvelteTable from 'svelte-table';

	export let drinks: any[];
	const columns = [
		{
			key: 'drink',
			title: 'Poängkälla',
			value: (v: any) => v[0],
			sortable: true
		},
		{
			key: 'amount',
			title: 'Antal',
			value: (v: any) => v[1],
			sortable: true
		}
	];
</script>

<div class="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
	<div class="overflow-x-auto">
		<SvelteTable
			rows={drinks}
			{columns}
			classNameTable="w-full text-center text-sm text-stone-700 border-collapse"
			classNameThead="text-xs text-stone-500 uppercase tracking-wider bg-stone-50 border-b border-stone-200 [&_th]:px-4 [&_th]:py-3"
			classNameRow="bg-white border-b border-stone-100 hover:bg-stone-50 transition-colors"
			classNameCell="px-4 py-3 sm:py-4 text-center font-medium"
		/>
	</div>
</div>
