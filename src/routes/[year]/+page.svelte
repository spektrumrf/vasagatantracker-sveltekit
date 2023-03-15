<script lang="ts">
	import Info from "$lib/components/Info.svelte";
	import Countdown from "$lib/components/Countdown.svelte";
	import { event } from "$lib/stores";
</script>

<Countdown/>
<Info info={$event?.info}/>
