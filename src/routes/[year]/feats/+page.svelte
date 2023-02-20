<script lang="ts">
	import AddFeat from '$lib/components/AddFeat.svelte';
	import FeatTable from '$lib/components/FeatTable.svelte';
	import { account, Role } from '$lib/stores';
</script>

{#if $account?.role === Role.TEAM}
	<AddFeat />
{/if}
<FeatTable />
