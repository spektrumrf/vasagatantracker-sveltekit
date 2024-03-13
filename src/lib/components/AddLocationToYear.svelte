<script lang="ts">
	import { event } from '$lib/stores';
	import type { Location } from '$lib/stores';
	export let selectedLocationToAddToYear: Location | null = null;
</script>

<form method="POST" enctype="multipart/form-data" action="?/addLocationToYear">
	<input hidden name="locationId" value={selectedLocationToAddToYear?.id} />
	<input hidden name="eventId" value={$event?.id} />
	<button class="btn btn-primary my-5">Koppla plats till år {$event?.year}</button>
</form>
