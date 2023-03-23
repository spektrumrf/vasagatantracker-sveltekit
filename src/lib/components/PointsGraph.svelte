<script lang="ts">
	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { fi } from 'date-fns/locale';
	import { feats, teams } from '$lib/stores';
	import { onMount } from 'svelte';

	let points;
	const featsByTeam: { [key: string]: any[] } = {};

	$feats.forEach((f) => {
		if (!featsByTeam[f.team]) {
			featsByTeam[f.team] = [];
		} else {
			featsByTeam[f.team].push(f);
		}
	});
	const data = {
		datasets: Object.keys(featsByTeam).map((team) => ({
			data: featsByTeam[team].map((f) => ({ x: f.created.slice(0, -5), y: f.points })),
			label: $teams.find(t => t.id === team).name,
		}))
	};

	const config = {
		type: 'line',
		data,
		options: {
			scales: {
				xAxis: { type: 'time' }
			},
			adapters: { date: { locale: fi } }
		}
	};
	onMount(() => {
		const ctx = points.getContext('2d');
		let chart = new Chart(ctx, config);
	});
</script>

{#if Object.keys(data).length !== 0}
	<canvas bind:this={points} width={400} height={400} />
{/if}
