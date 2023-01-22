<script lang="ts">
	export let name: string;
	export let label: string = '';
	export let altLabel: string = '';
	export let type: string;
	export let value: string = '';
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for={name.toLowerCase()}>
		<span class="label-text">{label}</span>
		<span class="label-text-alt">{altLabel}</span>
	</label>
	<input {type} {name} {value} class="input input-bordered w-full max-w-xs" />
</div>
