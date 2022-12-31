<script lang="ts">
	import { locations } from '$lib/stores';
</script>

{#each $locations as location}
	<div>{location.name}</div>
{/each}
