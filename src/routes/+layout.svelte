<script lang="ts">
	import { account, feats, locations } from '$lib/stores';
	import '../app.css';
	import type { PageData } from './$types';

	export let data: PageData;
	$account = data.account;
	$feats = data.feats;
	$locations = data.locations;
</script>

<div class="my-10">
	<div class="navbar bg-base-100">
		<div class="flex-none">
			<button class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-5 h-5 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/></svg
				>
			</button>
		</div>
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Vasagatantracker</a>
		</div>
		<div class="flex-1">
			<span>{$account.name}</span>
		</div>
	</div>
	<slot />
</div>
