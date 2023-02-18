<script lang="ts">
	import Info from "$lib/components/Info.svelte";
	import { event } from "$lib/stores";
</script>

<Info info={$event?.info}/>
