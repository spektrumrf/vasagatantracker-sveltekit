<script lang="ts">
	export let feat;
</script>

<div class={`modal modal-bottom sm:modal-middle ${feat && 'modal-open'}`}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Prestation</h3>
		<div class="form-control w-full max-w-xs">
			<label for="points" class="label"> Poäng </label>
			{feat?.points}
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="location" class="label"> Plats </label>
			{feat?.expand.location.name}
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="teamComment" class="label"> Lagkommentar </label>
			{feat?.teamComment}
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="proofs" class="label"> Bevis </label>
			<img
				src={`https://pocketbase-docker-dev.up.railway.app/api/files/feat/${feat?.id}/${feat?.proofs[0]}`}
			/>
		</div>
		<div>
			<button on:click={() => (feat = null)} for="feat" class="btn">Stäng</button>
		</div>
	</div>
</div>
