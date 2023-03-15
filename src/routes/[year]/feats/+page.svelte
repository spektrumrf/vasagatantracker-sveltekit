<script lang="ts">
	import AddFeat from '$lib/components/AddFeat.svelte';
	import FeatTable from '$lib/components/FeatTable.svelte';
	import { account, Role } from '$lib/stores';
	import { superForm} from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData
	const { form, constraints, errors } = superForm(data.form)
</script>

{#if $account?.role === Role.TEAM}
	<AddFeat {form} {constraints}/>
{/if}

<h3 class="font-bold text-2xl mb-5">Prestationer</h3>
<FeatTable />
