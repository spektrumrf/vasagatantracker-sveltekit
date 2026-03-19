<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event } from '$lib/stores';
	import { enhance } from '$app/forms';
	import Loading from '$lib/components/Loading.svelte';

	export let form: any;

	let loading = false;
</script>

<div class="flex items-center justify-center px-4 py-10">
	<div class="w-full max-w-lg rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
		<h3 class="mb-2 text-center font-serif text-2xl font-bold text-brand-900">
			Registrera ditt lag
		</h3>
		<p class="mb-6 border-b border-stone-100 pb-6 text-center text-sm text-stone-500">
			OBS! Endast en registrering per lag.
		</p>

		<form
			method="POST"
			autocomplete="off"
			class="space-y-4"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
		>
			<div class="space-y-1">
				<Input
					name="username"
					type="text"
					label="Användarnamn"
					altLabel="Små bokstäver, siffror, _"
					value={form?.data?.username ?? ''}
				/>
				{#if form?.errors?.username}
					<p class="mt-1 text-xs text-red-600">{form.errors.username[0]}</p>
				{/if}
				<p class="mt-1 text-xs text-stone-500">Minst tre tecken i användarnamn</p>
			</div>

			<div class="space-y-1">
				<Input
					name="password"
					type="password"
					label="Lösenord"
					altLabel="Minst 8 tecken"
					value={form?.data?.password ?? ''}
				/>
				{#if form?.errors?.password}
					<p class="mt-1 text-xs text-red-600">{form.errors.password[0]}</p>
				{/if}
			</div>

			<div class="space-y-1">
				<Input
					name="passwordConfirm"
					type="password"
					label="Lösenord (igen)"
					value={form?.data?.passwordConfirm ?? ''}
				/>
				{#if form?.errors?.passwordConfirm}
					<p class="mt-1 text-xs text-red-600">{form.errors.passwordConfirm[0]}</p>
				{/if}
			</div>

			<div class="space-y-1">
				<Input name="email" type="email" label="Epost" value={form?.data?.email ?? ''} />
				{#if form?.errors?.email}
					<p class="mt-1 text-xs text-red-600">{form.errors.email[0]}</p>
				{/if}
			</div>

			<div class="space-y-1">
				<Input name="name" type="text" label="Lagnamn" value={form?.data?.name ?? ''} />
				{#if form?.errors?.name}
					<p class="mt-1 text-xs text-red-600">{form.errors.name[0]}</p>
				{/if}
			</div>

			<div class="space-y-1">
				<Input
					name="members"
					type="text"
					label="Lagets medlemmar"
					altLabel="Förnamn räcker"
					value={form?.data?.members ?? ''}
				/>
				{#if form?.errors?.members}
					<p class="mt-1 text-xs text-red-600">{form.errors.members[0]}</p>
				{/if}
			</div>

			<div class="space-y-1">
				<Input
					name="coefficient"
					type="number"
					label="Koefficient"
					altLabel="1 om osäker"
					step="0.01"
					value={form?.data?.coefficient ?? 1}
				/>
				{#if form?.errors?.coefficient}
					<p class="mt-1 text-xs text-red-600">{form.errors.coefficient[0]}</p>
				{/if}
			</div>

			<input hidden name="event" value={$event?.id} />

			{#if form?.error}
				<div class="mt-4 rounded-r border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700">
					{form.error}
				</div>
			{/if}

			<div class="pt-4">
				<button class="btn-primary w-full py-2.5">
					<Loading {loading}>Registrera</Loading>
				</button>
			</div>
		</form>
	</div>
</div>
