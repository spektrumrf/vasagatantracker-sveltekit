<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { event } from '$lib/stores';
	import type { Location } from '$lib/stores';
	export let selectedLocationToAddToYear: Location | null = null;
	let loading = false;
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	action="?/addLocationToYear"
	on:submit={() => (loading = true)}
>
	<input hidden name="locationId" value={selectedLocationToAddToYear?.id} />
	<input hidden name="eventId" value={$event?.id} />
	<button class="btn btn-primary my-5">
		<Loading {loading}>
			Koppla plats till år {$event?.year}
		</Loading>
	</button>
</form>
