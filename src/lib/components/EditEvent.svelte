<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { event } from '$lib/stores';
	let finished = $event?.finished;
	let loading = false;
</script>

<label for="editEvent" class="btn-primary inline-block cursor-pointer">Editera</label>

<!-- Edit Event Modal -->
<input type="checkbox" id="editEvent" class="peer hidden" />
<div
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="editEvent" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-4 max-h-[90vh] w-full max-w-2xl scale-95 transform overflow-y-auto border-4 border-stone-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-8 font-mono text-2xl font-black tracking-tight text-brand-900 uppercase">
			Editera evenemang
		</h3>
		<form
			method="POST"
			class="space-y-6"
			enctype="multipart/form-data"
			action="?/edit"
			on:submit={() => (loading = true)}
		>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<Input name="what" value={$event?.info.what} type="text" label="Vad?" />
				<Input name="why" value={$event?.info.why} type="text" label="Varför?" />
				<Input name="when" value={$event?.info.when} type="text" label="När?" />
				<Input name="where" value={$event?.info.where} type="text" label="Var?" />
				<Input name="start" value={$event?.info.start} type="text" label="Start?" />
				<Input name="finish" value={$event?.info.finish} type="text" label="Mål?" />
			</div>

			<Input name="registration" value={$event?.info.registration} type="text" label="Anmälan?" />
			<Input
				name="details"
				value={$event?.info.details}
				type="text"
				label="Detaljerad info?"
				altLabel="Länk"
			/>
			<Input
				name="important"
				value={$event?.info.important}
				type="text"
				label="Viktig info!"
				altLabel="Länk"
			/>

			<div class="flex items-center">
				<input
					id="finished-checkbox"
					type="checkbox"
					name="finished"
					class="h-6 w-6 rounded-none border-4 border-stone-900 text-brand-600 focus:ring-brand-500"
					value={finished?.toString()}
					checked={$event?.finished}
					on:change={() => (finished = !finished)}
				/>
				<label
					for="finished-checkbox"
					class="ml-3 block cursor-pointer font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
				>
					Slutförd
				</label>
			</div>

			<Input name="id" value={$event?.id} type="hidden" />

			<div class="mt-8 flex flex-col gap-4 border-t-4 border-stone-900 pt-8 sm:flex-row">
				<button class="btn-primary flex-1">
					<Loading {loading}>Spara</Loading>
				</button>
				<label for="editEvent" class="btn-secondary flex-1 cursor-pointer text-center">Stäng</label>
			</div>
		</form>
	</div>
</div>
