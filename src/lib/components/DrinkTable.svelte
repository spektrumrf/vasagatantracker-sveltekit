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

<div class="card overflow-x-auto bg-white p-1">
	<SvelteTable
		rows={drinks}
		{columns}
		classNameTable="w-full text-center font-mono text-base text-stone-900 border-collapse"
		classNameThead="text-xs text-stone-600 uppercase tracking-widest bg-brand-100 border-b-4 border-stone-900 [&_th]:px-4 [&_th]:py-3 [&_th]:font-black"
		classNameRow="bg-white border-b-2 border-stone-200 hover:bg-brand-50 transition-colors font-bold"
		classNameCell="px-4 py-3 sm:py-4 text-center"
	/>
</div>
