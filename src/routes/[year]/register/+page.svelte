<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event } from '$lib/stores';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import Loading from '$lib/components/Loading.svelte';
	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form);
	let loading = false;
</script>

<div class="flex">
	<div class="mx-auto">
		<h3 class="text-2xl font-bold mb-3">Registrera ditt lag</h3>
		<div>OBS! Endast en registrering per lag.</div>
		<form method="POST" autocomplete="off" on:submit={() => (loading = true)}>
			<Input
				name="username"
				type="text"
				label="Användarnamn"
				altLabel="Små bokstäver, siffror, _"
				constraints={$constraints.username}
				value={$form.username}
			/>
			<span class="text-xs ml-2">Minst tre tecken i användarnamn</span>
			<Input
				name="password"
				type="password"
				label="Lösenord"
				altLabel="Minst 8 tecken"
				constraints={$constraints.password}
				value={$form.password}
			/>
			<Input
				name="passwordConfirm"
				type="password"
				label="Lösenord (igen)"
				constraints={$constraints.passwordConfirm}
				value={$form.passwordConfirm}
			/>
			{#if $errors.passwordConfirm}
				<span class="text-error">{$errors.passwordConfirm}</span>
			{/if}
			<Input
				name="email"
				type="email"
				label="Epost"
				constraints={$constraints.email}
				value={$form.email}
			/>
			<Input
				name="name"
				type="text"
				label="Lagnamn"
				constraints={$constraints.name}
				value={$form.name}
			/>
			<Input
				name="members"
				type="text"
				label="Lagets medlemmar"
				altLabel="Förnamn räcker"
				constraints={$constraints.members}
				value={$form.members}
			/>
			<Input
				name="coefficient"
				type="number"
				label="Koefficient"
				altLabel="1 om osäker"
				constraints={$constraints.coefficient}
				step="0.01"
				value={$form.coefficient || 1}
			/>
			<input hidden name="event" value={$event?.id} />
			<button class="btn btn-primary mt-5">
				<Loading {loading}>Registrera</Loading>
			</button>
		</form>
	</div>
</div>
