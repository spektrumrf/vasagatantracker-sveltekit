<script lang="ts">
	import AddFeat from '$lib/components/AddFeat.svelte';
	import FeatTable from '$lib/components/FeatTable.svelte';
	import { account, event, Role } from '$lib/stores';
	const hasEventStarted =
		new Date($event?.startTime || '').toISOString() < new Date().toISOString();
</script>

{#if $account?.role === Role.TEAM && hasEventStarted && !$event?.finished}
	<AddFeat />
{/if}

<h3 class="font-bold text-2xl mb-5">Prestationer</h3>
<FeatTable />
