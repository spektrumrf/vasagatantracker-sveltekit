<script lang="ts">
	import DrinkTable from '$lib/components/DrinkTable.svelte';
	import PointsGraph from '$lib/components/PointsGraph.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const drinkEntries = Object.entries(data.totalDrinks);
</script>

<div class="space-y-10">
	<div>
		<h3 class="mb-6 font-serif text-3xl font-bold text-brand-900">Statistik</h3>
		<hr class="border-stone-200" />
	</div>

	<section>
		<h4 class="mb-4 font-serif text-xl font-bold text-brand-900">Poängkällor</h4>
		<DrinkTable drinks={drinkEntries} />
	</section>

	<section>
		<h4 class="mb-4 font-serif text-xl font-bold text-brand-900">Poäng</h4>
		<div class="rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
			<PointsGraph />
		</div>
	</section>
</div>
