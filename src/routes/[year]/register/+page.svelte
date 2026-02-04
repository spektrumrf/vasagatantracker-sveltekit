<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event } from '$lib/stores';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import Loading from '$lib/components/Loading.svelte';

	export let form: ActionData;

	let loading = false;
</script>

<div class="flex">
	<div class="mx-auto">
		<h3 class="text-2xl font-bold mb-3">Registrera ditt lag</h3>
		<div>OBS! Endast en registrering per lag.</div>
		<form
			method="POST"
			autocomplete="off"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
		>
			<Input
				name="username"
				type="text"
				label="Användarnamn"
				altLabel="Små bokstäver, siffror, _"
				value={form?.data?.username ?? ''}
			/>
			{#if form?.errors?.username}
				<span class="text-error text-xs ml-2">{form.errors.username[0]}</span>
			{/if}
			<span class="text-xs ml-2">Minst tre tecken i användarnamn</span>

			<Input
				name="password"
				type="password"
				label="Lösenord"
				altLabel="Minst 8 tecken"
				value={form?.data?.password ?? ''}
			/>
			{#if form?.errors?.password}
				<span class="text-error text-xs ml-2">{form.errors.password[0]}</span>
			{/if}

			<Input
				name="passwordConfirm"
				type="password"
				label="Lösenord (igen)"
				value={form?.data?.passwordConfirm ?? ''}
			/>
			{#if form?.errors?.passwordConfirm}
				<span class="text-error text-xs ml-2">{form.errors.passwordConfirm[0]}</span>
			{/if}

			<Input name="email" type="email" label="Epost" value={form?.data?.email ?? ''} />
			{#if form?.errors?.email}
				<span class="text-error text-xs ml-2">{form.errors.email[0]}</span>
			{/if}

			<Input name="name" type="text" label="Lagnamn" value={form?.data?.name ?? ''} />
			{#if form?.errors?.name}
				<span class="text-error text-xs ml-2">{form.errors.name[0]}</span>
			{/if}

			<Input
				name="members"
				type="text"
				label="Lagets medlemmar"
				altLabel="Förnamn räcker"
				value={form?.data?.members ?? ''}
			/>
			{#if form?.errors?.members}
				<span class="text-error text-xs ml-2">{form.errors.members[0]}</span>
			{/if}

			<Input
				name="coefficient"
				type="number"
				label="Koefficient"
				altLabel="1 om osäker"
				step="0.01"
				value={form?.data?.coefficient ?? 1}
			/>
			{#if form?.errors?.coefficient}
				<span class="text-error text-xs ml-2">{form.errors.coefficient[0]}</span>
			{/if}

			<input hidden name="event" value={$event?.id} />

			{#if form?.error}
				<div class="alert alert-error mt-3">
					{form.error}
				</div>
			{/if}

			<button class="btn btn-primary mt-5">
				<Loading {loading}>Registrera</Loading>
			</button>
		</form>
	</div>
</div>