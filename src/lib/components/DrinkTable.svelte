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

<div class="overfull-x-auto">
	<SvelteTable
		rows={drinks}
		{columns}
		classNameThead="bg-primary text-center"
		classNameCell="text-center text-base"
		classNameTable="table table-sm"
	/>
</div>
