<script lang="ts">
	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
	import dayjs from 'dayjs';
	import 'dayjs/locale/fi';
	import { feats, teams } from '$lib/stores';
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement;
	let chart: Chart;

	$: featsByTeam = $feats
		.filter((f) => f.approved)
		.slice()
		.reverse()
		.reduce(
			(acc, f) => {
				if (!acc[f.team]) {
					acc[f.team] = [];
				}
				acc[f.team].push(f);
				return acc;
			},
			{} as { [key: string]: typeof $feats }
		);

	$: datasets = Object.keys(featsByTeam).map((team) => ({
		data: featsByTeam[team].reduce(
			(points: any[], f) =>
				points.concat({
					x: dayjs(f.created).toDate(),
					y: (points.at(-1)?.y || 0) + f.points
				}),
			[]
		),
		label: $teams.find((t) => t.id === team)?.name || 'Unknown Team'
	}));

	$: if (chart && datasets) {
		chart.data.datasets = datasets;
		chart.update();
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (ctx) {
			chart = new Chart(ctx, {
				type: 'line',
				data: {
					datasets: datasets || []
				},
				options: {
					scales: {
						x: {
							type: 'time'
						}
					},
					responsive: true,
					maintainAspectRatio: false
				}
			});
		}
	});

	onDestroy(() => {
		if (chart) chart.destroy();
	});
</script>

<div class="relative h-[400px] w-full">
	<canvas bind:this={canvas}></canvas>
</div>
