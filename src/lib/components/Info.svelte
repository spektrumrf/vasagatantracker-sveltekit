<script lang="ts">
	export let info: any = {};
</script>

<div class="mx-auto w-full max-w-2xl space-y-6 card bg-white p-6 sm:p-8">
	<div>
		<h3 class="mb-2 text-xl font-black">Vad?</h3>
		<p class="font-mono text-base font-bold tracking-wider text-stone-600 uppercase">
			{info.what || ''}
		</p>
	</div>

	<hr class="border-t-4 border-stone-900" />

	<div>
		<h3 class="mb-2 text-xl font-black">Varför?</h3>
		<p class="font-mono text-base font-bold tracking-wider text-stone-600 uppercase">
			{info.why || ''}
		</p>
	</div>

	<hr class="border-t-4 border-stone-900" />

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
		<div>
			<h3 class="mb-2 text-xl font-black">När?</h3>
			<p class="font-mono text-base font-bold tracking-wider text-stone-600 uppercase">
				{info.when || ''}
			</p>
		</div>

		<div>
			<h3 class="mb-2 text-xl font-black">Var?</h3>
			<p class="font-mono text-base font-bold tracking-wider text-stone-600 uppercase">
				{info.where || ''}
			</p>
		</div>

		<div>
			<h3 class="mb-2 text-xl font-black">Start?</h3>
			<p class="font-mono text-base font-bold tracking-wider text-stone-600 uppercase">
				{info.start || ''}
			</p>
		</div>

		<div>
			<h3 class="mb-2 text-xl font-black">Mål?</h3>
			<p class="font-mono text-base font-bold tracking-wider text-stone-600 uppercase">
				{info.finish || ''}
			</p>
		</div>
	</div>

	<hr class="border-t-4 border-stone-900" />

	<div>
		<h3 class="mb-2 text-xl font-black">Anmälan?</h3>
		<p class="font-mono text-base font-bold tracking-wider text-stone-600 uppercase">
			{info.registration || ''}
		</p>
	</div>

	<hr class="border-t-4 border-stone-900" />

	<div class="flex flex-col justify-between gap-4 sm:flex-row">
		<div>
			<h3 class="mb-2 text-xl">Detaljerad info?</h3>
			<p class="font-sans">
				<a
					class="font-bold text-brand-600 underline decoration-4 underline-offset-4 transition-colors hover:bg-brand-600 hover:text-white"
					href={info.details}>Approbatur i Vasagatan</a
				>
			</p>
		</div>

		<div>
			<h3 class="mb-2 text-xl">Viktig info!</h3>
			<p class="font-sans">
				<a
					class="font-bold text-brand-600 underline decoration-4 underline-offset-4 transition-colors hover:bg-brand-600 hover:text-white"
					href={info.important}>Lyssna här</a
				>
			</p>
		</div>
	</div>
</div>
