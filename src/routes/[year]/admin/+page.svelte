<script lang="ts">
	import EditEvent from '$lib/components/EditEvent.svelte';
	import EditLocation from '$lib/components/EditLocation.svelte';
	import EditTeam from '$lib/components/EditTeam.svelte';
	import { event } from '$lib/stores';
</script>

<h2 class="font-bold text-2xl">Admin</h2>

<span class="divider mb-5" />

<h3 class="font-bold text-xl mb-5">Evenemang {$event.year}</h3>
<EditEvent />

<h3 class="font-bold text-xl mt-3 mb-1">Platser</h3>
<EditLocation />

<h3 class="font-bold text-xl my-3">Lag</h3>
<EditTeam />
