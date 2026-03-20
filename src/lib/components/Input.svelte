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
	export let description: string = '';
</script>

<div class="w-full">
	{#if label || altLabel}
		<div class="mb-2 flex items-end justify-between gap-4">
			<label
				class="block font-mono text-sm font-bold tracking-wider text-stone-900 uppercase"
				for={name}
			>
				{label}
			</label>
			{#if altLabel}
				<span
					class="text-right font-mono text-[10px] leading-none font-black tracking-widest text-brand-600 uppercase"
					>{altLabel}</span
				>
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
	{#if description}
		<p
			class="mt-2 font-mono text-[10px] leading-tight font-bold tracking-widest text-stone-500 uppercase"
		>
			{description}
		</p>
	{/if}
</div>
