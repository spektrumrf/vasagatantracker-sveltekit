<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { teams, type Account } from '$lib/stores';

	let selectedTeamName: string | null;
	let selectedTeam: Account | undefined;
	let deleteLoading = false;
	let editLoading = false;
	$: {
		selectedTeam = $teams.find((t) => t.name === selectedTeamName);
	}
	function onDeleteSubmit(event: Event) {
		deleteLoading = true;
		if (!confirm('Är du säker att du vill radera laget? Lagets prestationer raderas också.')) {
			event.preventDefault();
			deleteLoading = false;
		}
	}
</script>

<div class="w-full">
	<label
		class="mb-2 block font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
		for="team-select"
	>
		Välj lag
	</label>
	<select id="team-select" name="team" class="input-field" bind:value={selectedTeamName}>
		<option disabled selected value={null}>Välj lag</option>
		{#each $teams as team}
			<option value={team.name}>{team.name}</option>
		{/each}
	</select>
</div>

{#if selectedTeam}
	<div class="mt-8 border-t-4 border-stone-900 pt-8 transition-all">
		<h4 class="mb-4 font-mono text-lg font-black text-brand-900 uppercase">
			{selectedTeam.name}
		</h4>
		<form method="POST" on:submit={onDeleteSubmit} action="?/deleteTeam">
			<div class="flex flex-wrap gap-4">
				<label for="editTeam" class="btn-primary cursor-pointer">Editera</label>
				<input type="hidden" name="id" value={selectedTeam?.id} />
				<button class="btn-danger" data-testid="deleteTeam">
					<Loading loading={deleteLoading}>Radera</Loading>
				</button>
			</div>
		</form>
	</div>
{/if}

<!-- Edit Team Modal -->
<input type="checkbox" id="editTeam" class="peer hidden" />
<div
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="editTeam" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-4 max-h-[90vh] w-full max-w-lg scale-95 transform overflow-y-auto border-4 border-stone-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-8 font-mono text-2xl font-black tracking-tight text-brand-900 uppercase">
			Editera lag
		</h3>
		<form
			method="POST"
			enctype="multipart/form-data"
			action="?/editTeam"
			on:submit={() => (editLoading = true)}
			class="space-y-6"
		>
			<Input name="name" value={selectedTeam?.name || ''} type="text" label="Lagets namn" />
			<Input
				name="members"
				value={selectedTeam?.members || ''}
				type="text"
				label="Lagets medlemmar"
			/>
			<Input
				name="coefficient"
				value={selectedTeam?.coefficient || 1}
				type="number"
				step="0.01"
				inputmode="decimal"
				label="Lagets koefficient"
			/>
			<Input name="id" value={selectedTeam?.id} type="hidden" />

			<div class="mt-8 flex flex-col gap-4 border-t-4 border-stone-900 pt-8 sm:flex-row">
				<button class="btn-primary flex-1">
					<Loading loading={editLoading}>Spara</Loading>
				</button>
				<label for="editTeam" class="btn-secondary flex-1 cursor-pointer text-center">Stäng</label>
			</div>
		</form>
	</div>
</div>
