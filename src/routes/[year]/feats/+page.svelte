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

<h3 class="mb-6 font-serif text-3xl font-bold text-brand-900">Prestationer</h3>
<FeatTable />
