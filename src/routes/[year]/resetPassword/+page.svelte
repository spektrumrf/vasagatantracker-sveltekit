<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	const token = $page.url.searchParams.get('token');
	export let form: ActionData;
</script>

<div class="flex items-center justify-center px-4 py-10">
	<div class="w-full max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
		<h3 class="mb-6 text-center font-serif text-2xl font-bold text-brand-900">
			Välj nytt lösenord
		</h3>
		<form method="POST" action={`?/confirm&token=${token}`} class="space-y-4">
			<Input name="password" type="password" label="Lösenord" />
			<Input name="passwordAgain" type="password" label="Lösenord igen" />
			<div class="pt-4">
				<button class="btn-primary w-full py-2.5">Uppdatera lösenord</button>
			</div>
			{#if form?.message}
				<div class="mt-4 rounded-r border-l-4 border-blue-500 bg-blue-50 p-3 text-sm text-blue-700">
					{form?.message}
				</div>
			{/if}
		</form>
	</div>
</div>
