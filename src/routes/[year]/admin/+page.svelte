<script lang="ts">
	import EditEvent from '$lib/components/EditEvent.svelte';
	import EditLocation from '$lib/components/EditLocation.svelte';
	import EditTeam from '$lib/components/EditTeam.svelte';
</script>

<div class="prose">
	<h3>Evenemang</h3>
	<EditEvent />

	<h3>Platser</h3>
	<EditLocation />

	<h3>Lag</h3>
	<EditTeam />
</div>
