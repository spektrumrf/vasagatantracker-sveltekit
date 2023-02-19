<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { teams, type Account } from '$lib/stores';
	let selectedTeam: Account | null;
</script>

<div class="form-control w-full max-w-xs">
	<select name="team" class="select select-bordered" bind:value={selectedTeam}>
		<option disabled selected value={null}>Välj lag</option>
		{#each $teams as team}
			<option value={team}>{team.name}</option>
		{/each}
	</select>
</div>
{#if selectedTeam}
	<label for="editTeam" class="btn">Editera</label>
{/if}
<input type="checkbox" id="editTeam" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Editera lag</h3>
		<form method="POST" enctype="multipart/form-data" action="?/editTeam">
			<Input name="name" value={selectedTeam?.name || ''} type="text" label="Lagets namn" />
			<Input
				name="coefficient"
				value={selectedTeam?.coefficient || 1}
				type="number"
				step="0.01"
				label="Lagets koefficient"
			/>
			<Input name="id" value={selectedTeam?.id} type="hidden" />
			<div>
				<button class="btn">Spara</button>
				<label for="editTeam" class="btn">Stäng</label>
			</div>
		</form>
	</div>
</div>
