<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { fi } from 'date-fns/locale';
	import { feats } from '$lib/stores';

	let data;
	$: {
		const featsByTeam: { [key: string]: any[] } = {};

		$feats.forEach((f) => {
			if (!featsByTeam[f.team]) {
				featsByTeam[f.team] = [];
			} else {
				featsByTeam[f.team].push(f);
			}
		});
		data = {
			datasets: Object.keys(featsByTeam).map((team) =>
				featsByTeam[team].map((f) => ({ x: f.created.slice(0,-5), y: f.points }))
			)
		};
		console.log(data)
	}
	const options = {
		scales: {
			xAxis: { type: 'time' }
		},
		adapters: { date: { locale: fi } },
		responsive: true
	};
</script>

<Line {data} {options} />
