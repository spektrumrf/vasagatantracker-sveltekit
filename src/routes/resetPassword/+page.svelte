<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	const token = $page.url.searchParams.get('token');
	export let form: ActionData;
</script>

<div class="flex">
	<div class="mx-auto">
		<h3 class="text-2xl font-bold my-3">Välj nytt lösenord</h3>
		<form method="POST" action={`?/confirm&token=${token}`}>
			<Input name="password" type="password" label="Lösenord" />
			<Input name="passwordAgain" type="password" label="Lösenord igen" />
			<button class="btn btn-primary my-5">Uppdatera lösenord</button>
			{#if form?.message}
				<div>{form?.message}</div>
			{/if}
		</form>
	</div>
</div>
