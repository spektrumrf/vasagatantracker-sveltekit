<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { event } from '$lib/stores';
	let finished = $event?.finished;
	let loading = false;
</script>

<label for="editEvent" class="btn btn-primary max-w-xs mb-5">Editera</label>
<input type="checkbox" id="editEvent" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box flex">
		<div class="mx-auto">
			<h3 class="font-bold text-2xl mb-2">Editera evenemang</h3>
			<form
				method="POST"
				class="mb-10"
				enctype="multipart/form-data"
				action="?/edit"
				on:submit={() => (loading = true)}
			>
				<Input name="what" value={$event?.info.what} type="text" label="Vad?" />
				<Input name="why" value={$event?.info.why} type="text" label="Varför?" />
				<Input name="when" value={$event?.info.when} type="text" label="När?" />
				<Input name="where" value={$event?.info.where} type="text" label="Var?" />
				<Input name="start" value={$event?.info.start} type="text" label="Start?" />
				<Input name="finish" value={$event?.info.finish} type="text" label="Mål?" />
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
				<div class="form-control">
					<label for="finished" class="label cursor-pointer">
						<span class="label-text">Slutförd</span>
					</label>
					<input
						type="checkbox"
						name="finished"
						class="toggle"
						value={finished}
						checked={$event?.finished}
						on:change={() => (finished = !finished)}
					/>
				</div>
				<Input name="id" value={$event?.id} type="hidden" />
				<div class="flex gap-3 pb-10">
					<button class="btn btn-primary">
						<Loading {loading}>Spara</Loading>
					</button>
					<label for="editEvent" class="btn">Stäng</label>
				</div>
			</form>
		</div>
	</div>
</div>
