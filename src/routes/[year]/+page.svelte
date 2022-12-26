<script lang="ts">
	import Info from "$lib/components/Info.svelte";
import type { PageData } from "./$types";

    export let data: PageData;
</script>

<Info info={data.event.info}/>
