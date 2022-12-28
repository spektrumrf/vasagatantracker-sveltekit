<script lang="ts">
	import type { ActionData } from './$types';
	import { event } from '$lib/stores';

	export let form: ActionData;
</script>

<form method="POST">
	{#if form?.credentialsError}
		<div>
			{form?.credentialsError}
		</div>
	{/if}
	{#if form?.incorrectYear}
		<div>
			{form?.incorrectYear}
		</div>
	{/if}
	<div>
		<label>
			Användarnamn
			<input class="input input-bordered" name="username" type="text" />
		</label>
	</div>
	<div>
		<label for="password">
			Lösenord
			<input class="input input-bordered" name="password" type="password" />
		</label>
	</div>
	<input hidden name="eventId" value={$event?.id}/>
	<button class="btn btn-primary">Logga in</button>
</form>
