<script lang="ts">
	export let info: any = {};
</script>

<div
	class="mx-auto w-full max-w-2xl space-y-6 rounded-lg border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
>
	<div>
		<h3 class="mb-2 font-serif text-xl font-bold text-brand-900">Vad?</h3>
		<p class="leading-relaxed text-stone-700">{info.what || ''}</p>
	</div>

	<hr class="border-stone-100" />

	<div>
		<h3 class="mb-2 font-serif text-xl font-bold text-brand-900">Varför?</h3>
		<p class="leading-relaxed text-stone-700">{info.why || ''}</p>
	</div>

	<hr class="border-stone-100" />

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
		<div>
			<h3 class="mb-2 font-serif text-xl font-bold text-brand-900">När?</h3>
			<p class="text-stone-700">{info.when || ''}</p>
		</div>

		<div>
			<h3 class="mb-2 font-serif text-xl font-bold text-brand-900">Var?</h3>
			<p class="text-stone-700">{info.where || ''}</p>
		</div>

		<div>
			<h3 class="mb-2 font-serif text-xl font-bold text-brand-900">Start?</h3>
			<p class="text-stone-700">{info.start || ''}</p>
		</div>

		<div>
			<h3 class="mb-2 font-serif text-xl font-bold text-brand-900">Mål?</h3>
			<p class="text-stone-700">{info.finish || ''}</p>
		</div>
	</div>

	<hr class="border-stone-100" />

	<div>
		<h3 class="mb-2 font-serif text-xl font-bold text-brand-900">Anmälan?</h3>
		<p class="leading-relaxed text-stone-700">{info.registration || ''}</p>
	</div>

	<hr class="border-stone-100" />

	<div class="flex flex-col justify-between gap-4 sm:flex-row">
		<div>
			<h3 class="mb-2 font-serif text-xl font-bold text-brand-900">Detaljerad info?</h3>
			<p>
				<a
					class="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-800"
					href={info.details}>Approbatur i Vasagatan</a
				>
			</p>
		</div>

		<div>
			<h3 class="mb-2 font-serif text-xl font-bold text-brand-900">Viktig info!</h3>
			<p>
				<a
					class="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-800"
					href={info.important}>Lyssna här</a
				>
			</p>
		</div>
	</div>
</div>
