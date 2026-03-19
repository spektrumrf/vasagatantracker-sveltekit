<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { event } from '$lib/stores';
	let finished = $event?.finished;
	let loading = false;
</script>

<label for="editEvent" class="mb-5 btn-primary inline-block cursor-pointer">Editera</label>

<!-- Edit Event Modal -->
<input type="checkbox" id="editEvent" class="peer hidden" />
<div
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="editEvent" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-4 max-h-[90vh] w-full max-w-2xl scale-95 transform overflow-y-auto rounded-xl bg-white p-6 shadow-xl transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-6 font-serif text-2xl font-bold text-brand-900">Editera evenemang</h3>
		<form
			method="POST"
			class="space-y-4"
			enctype="multipart/form-data"
			action="?/edit"
			on:submit={() => (loading = true)}
		>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

			<div class="mt-4 flex items-center">
				<input
					id="finished-checkbox"
					type="checkbox"
					name="finished"
					class="h-4 w-4 rounded border-stone-300 text-brand-600 focus:ring-brand-500"
					value={finished?.toString()}
					checked={$event?.finished}
					on:change={() => (finished = !finished)}
				/>
				<label for="finished-checkbox" class="ml-2 block text-sm font-medium text-stone-700">
					Slutförd
				</label>
			</div>

			<Input name="id" value={$event?.id} type="hidden" />

			<div class="mt-6 flex gap-3 border-t border-stone-100 pt-4">
				<button class="btn-primary flex-1">
					<Loading {loading}>Spara</Loading>
				</button>
				<label for="editEvent" class="btn-secondary flex-1 cursor-pointer text-center">Stäng</label>
			</div>
		</form>
	</div>
</div>
