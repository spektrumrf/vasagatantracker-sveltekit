<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { event } from '$lib/stores';
	let loading = false;
</script>

<div class="my-5">
	<label
		for="addLocation"
		class="btn-primary inline-block cursor-pointer bg-green-600 hover:bg-green-700">Ny plats</label
	>
</div>

<!-- Add Location Modal -->
<input type="checkbox" id="addLocation" class="peer hidden" />
<div
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="addLocation" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-4 max-h-[90vh] w-full max-w-md scale-95 transform overflow-y-auto rounded-xl bg-white p-6 shadow-xl transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-6 font-serif text-2xl font-bold text-brand-900">Ny plats</h3>
		<form
			method="POST"
			enctype="multipart/form-data"
			action="?/addLocation"
			on:submit={() => (loading = true)}
			class="space-y-4"
		>
			<Input name="name" type="text" label="Platsens namn" />
			<input hidden name="event" value={$event?.id} />

			<div class="mt-6 flex gap-3 border-t border-stone-100 pt-4">
				<button class="btn-primary flex-1">
					<Loading {loading}>Spara</Loading>
				</button>
				<label for="addLocation" class="btn-secondary flex-1 cursor-pointer text-center"
					>Stäng</label
				>
			</div>
		</form>
	</div>
</div>
