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

<div class="mb-6 w-full">
	<label class="mb-1 block text-sm font-medium text-stone-700" for="team-select">Välj lag</label>
	<select id="team-select" name="team" class="input-field" bind:value={selectedTeamName}>
		<option disabled selected value={null}>Välj lag</option>
		{#each $teams as team}
			<option value={team.name}>{team.name}</option>
		{/each}
	</select>
</div>

{#if selectedTeam}
	<div class="my-5 rounded-lg border border-stone-200 bg-stone-50 p-4">
		<h4 class="mb-3 text-lg font-medium">{selectedTeam.name}</h4>
		<form method="POST" on:submit={onDeleteSubmit} action="?/deleteTeam">
			<div class="flex flex-wrap gap-3">
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
	class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 opacity-0 backdrop-blur-sm transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
>
	<label for="editTeam" class="absolute inset-0 cursor-default"></label>
	<div
		class="relative mx-4 max-h-[90vh] w-full max-w-lg scale-95 transform overflow-y-auto rounded-xl bg-white p-6 shadow-xl transition-transform duration-200 peer-checked:scale-100 sm:p-8"
	>
		<h3 class="mb-6 font-serif text-2xl font-bold text-brand-900">Editera lag</h3>
		<form
			method="POST"
			enctype="multipart/form-data"
			action="?/editTeam"
			on:submit={() => (editLoading = true)}
			class="space-y-4"
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
				label="Lagets koefficient"
			/>
			<Input name="id" value={selectedTeam?.id} type="hidden" />

			<div class="mt-6 flex gap-3 border-t border-stone-100 pt-4">
				<button class="btn-primary flex-1">
					<Loading loading={editLoading}>Spara</Loading>
				</button>
				<label for="editTeam" class="btn-secondary flex-1 cursor-pointer text-center">Stäng</label>
			</div>
		</form>
	</div>
</div>
