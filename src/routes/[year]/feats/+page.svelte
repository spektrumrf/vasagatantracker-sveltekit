<script lang="ts">
	import AddFeat from '$lib/components/AddFeat.svelte';
	import FeatTable from '$lib/components/FeatTable.svelte';
	import { account, Role } from '$lib/stores';
	import type { Snapshot } from './$types';
	
	let filterSelections = {};
	
	export const snapshot: Snapshot = {
		capture: () => filterSelections,
		restore: (selections) => filterSelections = selections
	}
</script>

{#if $account?.role === Role.TEAM}
	<AddFeat />
{/if}

<h3 class="font-bold text-2xl mb-5">Prestationer</h3>
<FeatTable {filterSelections} />
