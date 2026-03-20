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
	<div class="w-full max-w-md card bg-white p-8">
		<h3
			class="mb-8 text-center font-mono text-3xl font-black tracking-tighter text-brand-900 uppercase"
		>
			Logga in
		</h3>

		<form method="POST" action="?/login" on:submit={() => (loading = true)} class="space-y-6">
			{#if form?.credentialsError}
				<div
					class="border-l-8 border-red-500 bg-red-50 p-4 font-mono text-sm font-bold tracking-wider text-red-700 uppercase shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"
				>
					{form?.credentialsError}
				</div>
			{/if}
			{#if form?.incorrectYear}
				<div
					class="border-l-8 border-amber-500 bg-amber-50 p-4 font-mono text-sm font-bold tracking-wider text-amber-700 uppercase shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"
				>
					{form?.incorrectYear}
				</div>
			{/if}

			<Input name="username" type="text" label="Användarnamn/epost" required={true} />
			<Input name="password" type="password" label="Lösenord" required={true} />
			<input hidden name="eventId" value={$event?.id} />

			<div class="pt-2">
				<button class="btn-primary w-full">
					<Loading {loading}>Logga in</Loading>
				</button>
			</div>
		</form>

		<div
			class="mt-6 text-center font-mono text-sm font-bold tracking-widest text-stone-600 uppercase"
		>
			Inget lag?
			<a
				class="ml-1 font-bold text-brand-600 underline decoration-4 underline-offset-4 transition-colors hover:bg-brand-600 hover:text-white"
				href={`${$page.url.origin}/${$page.params.year}/register`}>Registrera!</a
			>
		</div>

		<div class="mt-8 border-t-4 border-stone-900 pt-6">
			<button
				type="button"
				class="flex w-full items-center justify-between text-left font-mono text-sm font-bold tracking-widest text-stone-500 uppercase transition-colors hover:text-stone-900"
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
				<div class="mt-6 card bg-stone-50 p-6 transition-all">
					<form
						method="POST"
						action="?/passwordReset"
						on:submit={() => (resetLoading = true)}
						class="space-y-6"
					>
						<Input name="email" type="email" label="Epost" required={true} />
						<button class="btn-secondary w-full">
							<Loading loading={resetLoading}>Nollställ lösenord</Loading>
						</button>
					</form>
				</div>
			{/if}
		</div>

		{#if form?.resetMessage}
			<div
				class="mt-6 border-l-8 border-green-500 bg-green-50 p-4 font-mono text-sm font-bold tracking-wider text-green-700 uppercase shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"
			>
				{form?.resetMessage}
			</div>
		{/if}
	</div>
</div>
