<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { teams, type Account } from '$lib/stores';

	let selectedTeamName: string | null;
	let selectedTeam: Account | undefined;
	$: {
		selectedTeam = $teams.find((t) => t.name === selectedTeamName);
	}
</script>

<div class="form-control w-full max-w-xs">
	<select name="team" class="select select-bordered" bind:value={selectedTeamName}>
		<option disabled selected value={null}>Välj lag</option>
		{#each $teams as team}
			<option value={team.name}>{team.name}</option>
		{/each}
	</select>
</div>
{#if selectedTeam}
	<div class="my-5">
		<form
			method="POST"
			onsubmit="return confirm('Är du säker att du vill radera laget? Lagets prestationer raderas också.')"
			action="?/deleteTeam"
		>
			<div class="flex gap-3">
				<label for="editTeam" class="btn btn-primary">Editera</label>
				<input type="hidden" name="id" value={selectedTeam?.id} />
				<button class="btn btn-error">Radera</button>
			</div>
		</form>
	</div>
{/if}
<input type="checkbox" id="editTeam" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box flex">
		<div class="mx-auto">
			<h3 class="font-bold text-2xl">Editera lag</h3>
			<form method="POST" enctype="multipart/form-data" action="?/editTeam">
				<Input name="name" value={selectedTeam?.name || ''} type="text" label="Lagets namn" />
				<Input name="members" value={selectedTeam?.members || ''} type="text" label="Lagets medlemmar" />
				<Input
					name="coefficient"
					value={selectedTeam?.coefficient || 1}
					type="number"
					step="0.01"
					label="Lagets koefficient"
				/>
				<Input name="id" value={selectedTeam?.id} type="hidden" />
				<div class="flex gap-3">
					<button class="btn btn-primary">Spara</button>
					<label for="editTeam" class="btn">Stäng</label>
				</div>
			</form>
		</div>
	</div>
</div>
