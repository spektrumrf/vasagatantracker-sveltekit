<script lang="ts">
	import type { ActionData } from './$types';
	import { event } from '$lib/stores';
	import { page } from '$app/stores';
	import Input from '$lib/components/Input.svelte';
	export let form: ActionData;
</script>

<form method="POST">
	{#if form?.credentialsError}
		<div>
			{form?.credentialsError}
		</div>
	{/if}
	{#if form?.incorrectYear}
		<div>
			{form?.incorrectYear}
		</div>
	{/if}
	<Input name="username" type="text" />
	<Input name="password" type="password" />
	<input hidden name="eventId" value={$event?.id} />
	<button class="btn btn-primary">Logga in</button>
</form>
<div>
	Inget lag?
	<a class="link" href={`${$page.url.origin}/${$page.params.year}/register`}>Registrera!</a>
</div>
