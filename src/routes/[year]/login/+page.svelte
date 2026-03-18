<script lang="ts">
	import type { ActionData } from './$types';
	import { event } from '$lib/stores';
	import { page } from '$app/stores';
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	export let form: ActionData;
	let loading = false;
	let resetLoading = false;
	let showReset = false;
</script>

<div class="flex items-center justify-center px-4 py-10">
	<div class="w-full max-w-md rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
		<h3 class="mb-6 text-center font-serif text-2xl font-bold text-brand-900">Logga in</h3>

		<form method="POST" action="?/login" on:submit={() => (loading = true)} class="space-y-4">
			{#if form?.credentialsError}
				<div class="rounded-r border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700">
					{form?.credentialsError}
				</div>
			{/if}
			{#if form?.incorrectYear}
				<div class="rounded-r border-l-4 border-amber-500 bg-amber-50 p-3 text-sm text-amber-700">
					{form?.incorrectYear}
				</div>
			{/if}

			<Input name="username" type="text" label="Användarnamn/epost" required={true} />
			<Input name="password" type="password" label="Lösenord" required={true} />
			<input hidden name="eventId" value={$event?.id} />

			<div class="pt-2">
				<button class="btn-primary w-full py-2.5">
					<Loading {loading}>Logga in</Loading>
				</button>
			</div>
		</form>

		<div class="mt-6 text-center text-sm text-stone-600">
			Inget lag?
			<a
				class="ml-1 font-medium text-brand-600 underline underline-offset-2 hover:text-brand-800"
				href={`${$page.url.origin}/${$page.params.year}/register`}>Registrera!</a
			>
		</div>

		<div class="mt-8 border-t border-stone-100 pt-6">
			<button
				type="button"
				class="flex w-full items-center justify-between text-left text-sm text-stone-500 italic transition-colors hover:text-stone-800"
				on:click={() => (showReset = !showReset)}
			>
				<span>Glömt lösenord? Tryck här!</span>
				<svg
					class={`h-4 w-4 transform transition-transform ${showReset ? 'rotate-180' : ''}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			{#if showReset}
				<div class="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-4 transition-all">
					<form
						method="POST"
						action="?/passwordReset"
						on:submit={() => (resetLoading = true)}
						class="space-y-4"
					>
						<Input name="email" type="email" label="Epost" required={true} />
						<button class="btn-secondary w-full py-2">
							<Loading loading={resetLoading}>Nollställ lösenord</Loading>
						</button>
					</form>
				</div>
			{/if}
		</div>

		{#if form?.resetMessage}
			<div
				class="mt-4 rounded-r border-l-4 border-green-500 bg-green-50 p-3 text-sm text-green-700"
			>
				{form?.resetMessage}
			</div>
		{/if}
	</div>
</div>
