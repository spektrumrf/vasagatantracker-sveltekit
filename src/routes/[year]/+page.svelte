<script lang="ts">
	import Info from '$lib/components/Info.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import { event } from '$lib/stores';
</script>

<div class="mb-8">
	<Countdown />
</div>
<Info info={$event?.info} />
