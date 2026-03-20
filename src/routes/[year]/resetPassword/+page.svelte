<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	const token = $page.url.searchParams.get('token');
	export let form: ActionData;
</script>

<div class="flex items-center justify-center px-4 py-10">
	<div class="w-full max-w-md card bg-white p-6 sm:p-8">
		<h3
			class="mb-8 text-center font-mono text-2xl font-black tracking-tight text-brand-900 uppercase"
		>
			Välj nytt lösenord
		</h3>
		<form method="POST" action={`?/confirm&token=${token}`} class="space-y-6">
			<Input name="password" type="password" label="Lösenord" />
			<Input name="passwordAgain" type="password" label="Lösenord igen" />
			<div class="pt-2">
				<button class="btn-primary w-full">Uppdatera lösenord</button>
			</div>
			{#if form?.message}
				<div
					class="mt-6 border-l-8 border-brand-500 bg-brand-50 p-4 font-mono text-sm font-bold tracking-wider text-brand-900 uppercase shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"
				>
					{form?.message}
				</div>
			{/if}
		</form>
	</div>
</div>
