<script lang="ts">
  import { feats } from '$lib/stores';
</script>

{#each $feats as feat}
  <div>{feat.points}</div>
{/each}
