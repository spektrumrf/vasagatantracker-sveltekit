<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import 'chart.js/auto';
	import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
	import dayjs from 'dayjs';
	import 'dayjs/locale/fi';
	import { feats, teams } from '$lib/stores';
	let data: any;
	let options: any;
	$: {
		const featsByTeam: { [key: string]: any[] } = {};
		$feats
			.filter((f) => f.approved)
			.reverse()
			.forEach((f) => {
				if (!featsByTeam[f.team]) {
					featsByTeam[f.team] = [f];
				} else {
					featsByTeam[f.team].push(f);
				}
			});
		data = {
			datasets: Object.keys(featsByTeam).map((team) => ({
				data: featsByTeam[team].reduce(
					(points, f) =>
						points.concat({
							x: dayjs(f.created).toDate(),
							y: (points.at(-1)?.y || 0) + f.points
						}),
					[]
				),
				label: $teams.find((t) => t.id === team)?.name
			}))
		};
		options = {
			scales: {
				x: {
					type: 'time'
				}
			},
			responsive: true,
			maintainAspectRatio: true
		};
	}
</script>

<Line {data} {options} width={375} height={400} />
