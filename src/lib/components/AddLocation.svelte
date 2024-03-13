<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event } from '$lib/stores';
</script>

<div class="">
	<label for="addLocation" class="btn btn-success my-5 max-w-xs">Ny plats</label>
</div>
<input type="checkbox" id="addLocation" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box flex">
		<div class="mx-auto">
			<h3 class="font-bold text-2xl">Ny plats</h3>
			<form method="POST" enctype="multipart/form-data" action="?/addLocation">
				<Input name="name" type="text" label="Platsens namn" />
				<input hidden name="event" value={$event?.id} />
				<div class="flex gap-3 my-3">
					<button class="btn btn-primary">Spara</button>
					<label for="addLocation" class="btn">Stäng</label>
				</div>
			</form>
		</div>
	</div>
</div>
