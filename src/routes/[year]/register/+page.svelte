<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { event } from '$lib/stores';
</script>

<div class="flex">
	<div class="mx-auto">
		<h3 class="text-2xl font-bold mb-3">Registrera ditt lag</h3>
		<div>OBS! Endast en registrering per lag.</div>
		<form method="POST">
			<Input name="username" type="text" label="Användarnamn" altLabel="Endast små bokstäver" minlength="3" />
			<Input name="password" type="password" label="Lösenord" altLabel="Minst 8 tecken" minlength="8" />
			<Input name="passwordConfirm" type="password" label="Lösenord (igen)" minlength="8" />
			<Input name="email" type="email" label="Epost" />
			<Input name="name" type="text" label="Lagnamn" />
			<Input name="members" type="text" label="Lagets medlemmar" altLabel="Förnamn räcker" />
			<Input name="coefficient" type="number" label="Koefficient" altLabel="1 om osäker" min="0" max="10" step="0.01" />
			<input hidden name="event" value={$event?.id} />
			<button class="btn btn-primary mt-5">Registrera</button>
		</form>
	</div>
</div>
