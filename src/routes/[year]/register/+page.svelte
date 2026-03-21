<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event } from '$lib/stores';
	import { enhance } from '$app/forms';
	import Loading from '$lib/components/Loading.svelte';

	export let form: any;

	let loading = false;
</script>

<div class="flex items-center justify-center px-4 py-10">
	<div class="w-full max-w-lg card bg-white p-6 sm:p-8">
		<h3
			class="mb-4 text-center font-mono text-3xl font-black tracking-tighter text-brand-900 uppercase"
		>
			Registrera lag
		</h3>
		<p
			class="mb-8 border-b-4 border-stone-900 pb-6 text-center font-mono text-xs font-bold tracking-[0.2em] text-stone-500 uppercase"
		>
			OBS! Endast en registrering per lag.
		</p>

		<form
			method="POST"
			autocomplete="off"
			class="space-y-6"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
		>
			<div class="space-y-2">
				<Input
					name="username"
					type="text"
					label="Användarnamn"
					altLabel="A-Z, 0-9, _"
					description="Minst tre tecken. Används för inloggning."
					value={form?.data?.username ?? ''}
				/>
				{#if form?.errors?.username}
					<p class="font-mono text-xs font-bold tracking-wider text-red-600 uppercase">
						{form.errors.username[0]}
					</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Input
					name="password"
					type="password"
					label="Lösenord"
					description="Minst 8 tecken långt och svårgissat."
					value={form?.data?.password ?? ''}
				/>
				{#if form?.errors?.password}
					<p class="font-mono text-xs font-bold tracking-wider text-red-600 uppercase">
						{form.errors.password[0]}
					</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Input
					name="passwordConfirm"
					type="password"
					label="Lösenord (igen)"
					description="Upprepa lösenordet för att bekräfta."
					value={form?.data?.passwordConfirm ?? ''}
				/>
				{#if form?.errors?.passwordConfirm}
					<p class="font-mono text-xs font-bold tracking-wider text-red-600 uppercase">
						{form.errors.passwordConfirm[0]}
					</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Input
					name="email"
					type="email"
					label="Epost"
					description="Används för att återställa lösenord."
					value={form?.data?.email ?? ''}
					inputmode="email"
				/>
				{#if form?.errors?.email}
					<p class="font-mono text-xs font-bold tracking-wider text-red-600 uppercase">
						{form.errors.email[0]}
					</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Input
					name="name"
					type="text"
					label="Lagnamn"
					description="Det publika namnet på ert lag."
					value={form?.data?.name ?? ''}
				/>
				{#if form?.errors?.name}
					<p class="font-mono text-xs font-bold tracking-wider text-red-600 uppercase">
						{form.errors.name[0]}
					</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Input
					name="members"
					type="text"
					label="Medlemmar"
					description="Lista på lagmedlemmar (t.ex. förnamn)."
					value={form?.data?.members ?? ''}
				/>
				{#if form?.errors?.members}
					<p class="font-mono text-xs font-bold tracking-wider text-red-600 uppercase">
						{form.errors.members[0]}
					</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Input
					name="coefficient"
					type="number"
					label="Koefficient"
					description="Poängmultiplikator (standard är 1)."
					step="0.01"
					inputmode="decimal"
					value={form?.data?.coefficient ?? 1}
				/>
				{#if form?.errors?.coefficient}
					<p class="font-mono text-xs font-bold tracking-wider text-red-600 uppercase">
						{form.errors.coefficient[0]}
					</p>
				{/if}
			</div>

			<input hidden name="event" value={$event?.id} />

			{#if form?.error}
				<div
					class="border-l-8 border-red-500 bg-red-50 p-4 font-mono text-sm font-bold tracking-wider text-red-700 uppercase shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"
				>
					{form.error}
				</div>
			{/if}

			<div class="pt-4">
				<button class="btn-primary w-full">
					<Loading {loading}>Registrera</Loading>
				</button>
			</div>
		</form>
	</div>
</div>
