<script lang="ts">
	export let name: string;
	export let label: string = '';
	export let altLabel: string = '';
	export let type: string;
	export let value: any = '';
	export let step: string = '';
	export let minlength: string = '';
	export let min: string = '';
	export let max: string = '';
	export let disabled: boolean = false;
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
		<span class="label-text-alt">{altLabel}</span>
	</label>
	<input
		id="text-input"
		{type}
		{name}
		{value}
		{step}
		{minlength}
		{min}
		{max}
		{disabled}
		class="input input-bordered w-full max-w-xs"
	/>
</div>
