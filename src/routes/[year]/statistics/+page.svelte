<script lang="ts">
	import DrinkTable from '$lib/components/DrinkTable.svelte';
	import PointsGraph from '$lib/components/PointsGraph.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const drinkEntries = Object.entries(data.totalDrinks);
</script>

<div class="space-y-12">
	<div>
		<h3 class="mb-2 font-mono text-3xl font-black tracking-tighter text-brand-900 uppercase">
			Statistik
		</h3>
		<hr class="border-t-4 border-stone-900" />
	</div>

	<section>
		<h4 class="mb-6 font-mono text-xl font-black tracking-tight text-brand-900 uppercase">
			Poängkällor
		</h4>
		<DrinkTable drinks={drinkEntries} />
	</section>

	<section>
		<h4 class="mb-6 font-mono text-xl font-black tracking-tight text-brand-900 uppercase">
			Poängutveckling
		</h4>
		<div class="card bg-white p-4 sm:p-6">
			<PointsGraph />
		</div>
	</section>
</div>
