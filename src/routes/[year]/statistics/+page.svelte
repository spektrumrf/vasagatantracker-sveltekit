<script lang="ts">
	import DrinkTable from "$lib/components/DrinkTable.svelte";
import type { PageData } from "./$types";

  export let data: PageData
  const drinkEntries = Object.entries(data.totalDrinks)
  console.log(drinkEntries);
</script>

<h3 class="font-bold text-2xl mb-5">Statistik</h3>
<div class="divider"/>

<h4 class="font-bold text-xl mb-5">Poängkällor</h4>
<DrinkTable drinks={drinkEntries}/>