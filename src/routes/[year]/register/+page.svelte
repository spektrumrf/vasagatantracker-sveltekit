<script lang="ts">
	import { event } from '$lib/stores';
</script>

<h3 class="text-lg font-bold">Registrera ditt lag</h3>
<div>OBS! Endast en registrering per lag.</div>
<form method="POST">
	<div>
		<label>
			Användarnamn
			<input class="input input-bordered" name="username" minlength="3" type="text" />
		</label>
	</div>
	<div>
		<label for="password">
			Lösenord
			<input class="input input-bordered" name="password" minlength="8" type="password" />
		</label>
	</div>
	<div>
		<label for="passwordConfirm">
			Lösenord (igen)
			<input class="input input-bordered" name="passwordConfirm" minlength="8" type="password" />
		</label>
	</div>
	<div>
		<label>
			Epost
			<input class="input input-bordered" name="email" type="email" />
		</label>
	</div>
	<div>
		<label for="name">
			Lagnamn
			<input class="input input-bordered" name="name" type="text" />
		</label>
	</div>
	<div>
		<label for="coefficient">
			Koefficient
			<input
				class="input input-bordered"
				name="coefficient"
				type="number"
				min="0"
				max="10"
				step="0.01"
			/>
		</label>
	</div>
	<input hidden name="event" value={$event?.id} />
	<button class="btn btn-primary">Registrera lag</button>
</form>
