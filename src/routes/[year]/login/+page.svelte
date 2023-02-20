<script lang="ts">
	import type { ActionData } from './$types';
	import { event } from '$lib/stores';
	import { page } from '$app/stores';
	import Input from '$lib/components/Input.svelte';
	export let form: ActionData;
</script>

<div class="flex">
	<div class="mx-auto">
		<h3 class="text-2xl font-bold my-3">Logga in</h3>
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
			<Input name="username" type="text" label="Användarnamn/epost" />
			<Input name="password" type="password" label="Lösenord" />
			<input hidden name="eventId" value={$event?.id} />
			<button class="btn btn-primary my-5">Logga in</button>
		</form>
		<div>
			Inget lag?
			<a class="link" href={`${$page.url.origin}/${$page.params.year}/register`}>Registrera!</a>
		</div>
	</div>
</div>
