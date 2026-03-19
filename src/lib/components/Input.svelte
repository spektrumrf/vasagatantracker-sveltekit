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

<div class="w-full">
	{#if label || altLabel}
		<div class="mb-1 flex items-end justify-between">
			<label class="block text-sm font-medium text-stone-700" for={name}>
				{label}
			</label>
			{#if altLabel}
				<span class="text-xs text-stone-500">{altLabel}</span>
			{/if}
		</div>
	{/if}
	<input
		id={name}
		{type}
		{name}
		{value}
		{step}
		{disabled}
		{...constraints}
		{min}
		{max}
		{required}
		class="input-field"
	/>
</div>
