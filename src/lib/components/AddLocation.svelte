<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { event } from '$lib/stores';
	let loading = false;
</script>

<div>
	<label
		for="addLocation"
		class="btn-primary inline-block cursor-pointer bg-green-600 hover:bg-green-700"
	>
		Ny plats
	</label>
</div>

<!-- Add Location Modal -->
<input type="checkbox" id="addLocation" class="peer hidden" />
<div
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="addLocation" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-4 max-h-[90vh] w-full max-w-md scale-95 transform overflow-y-auto border-4 border-stone-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-8 font-mono text-2xl font-black tracking-tight text-brand-900 uppercase">
			Ny plats
		</h3>
		<form
			method="POST"
			enctype="multipart/form-data"
			action="?/addLocation"
			on:submit={() => (loading = true)}
			class="space-y-6"
		>
			<Input name="name" type="text" label="Platsens namn" />
			<input hidden name="event" value={$event?.id} />

			<div class="mt-8 flex flex-col gap-4 border-t-4 border-stone-900 pt-8 sm:flex-row">
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
