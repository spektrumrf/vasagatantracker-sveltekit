<script lang="ts">
	import SvelteTable from 'svelte-table';

	export let drinks: any[];
	const columns = [
		{
			key: 'drink',
			title: 'Poängkälla',
			value: (v) => v[0],
			sortable: true
		},
		{
			key: 'amount',
			title: 'Antal',
			value: (v) => v[1],
			sortable: true
		}
	];
</script>

<div class="overfull-x-auto">
	<SvelteTable
		rows={drinks}
		{columns}
		classNameThead="text-center"
		classNameCell="text-center text-base"
		classNameTable="table table-compact"
	/>
</div>
