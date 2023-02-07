<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event } from '$lib/stores';
	let finished = $event?.finished;
</script>

<label for="editEvent" class="btn">Editera</label>
<input type="checkbox" id="editEvent" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Editera evenemang</h3>
		<form method="POST" enctype="multipart/form-data" action="?/edit">
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
					bind:value={finished}
					on:click={() => (finished = !finished)}
					checked={$event?.finished}
				/>
			</div>
			<Input name="id" value={$event?.id} type="hidden" />
			<div>
				<button class="btn">Spara</button>
				<label for="editEvent" class="btn">Stäng</label>
			</div>
		</form>
	</div>
</div>
