<script lang="ts">
	import EditEvent from '$lib/components/EditEvent.svelte';
	import EditLocation from '$lib/components/EditLocation.svelte';
	import EditTeam from '$lib/components/EditTeam.svelte';
</script>

<h2 class="font-bold text-3xl mb-10">Admin</h2>
<h3 class="font-bold text-2xl mb-5">Evenemang</h3>
<EditEvent />

<h3 class="font-bold text-2xl my-5">Platser</h3>
<EditLocation />

<h3 class="font-bold text-2xl my-5">Lag</h3>
<EditTeam />
