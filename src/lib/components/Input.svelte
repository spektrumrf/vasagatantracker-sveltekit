<script lang="ts">
	export let name: string;
	export let label: string = '';
	export let altLabel: string = '';
	export let type: string;
	export let value: any = '';
	export let step: string = '';
	export let disabled: boolean = false;
 	export let constraints: any = [];
	export let min: number | null = null;
	export let max: number | null = null;
	export let required: boolean = false;
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
		{disabled}
		{...constraints}
		{min}
		{max}
		{required}
		class="input input-bordered w-full max-w-xs"
	/>
</div>
