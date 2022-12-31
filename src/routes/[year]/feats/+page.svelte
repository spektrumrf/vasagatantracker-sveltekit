<script lang="ts">
  import { feats } from '$lib/stores';
</script>

{#each $feats as feat}
  <div>{feat.points}</div>
{/each}

<label for="addFeat" class="btn">Ny prestation</label>

<input type="checkbox" id="addFeat" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Ny prestation</h3>
    <div class="modal-action">
      <label for="addFeat" class="btn">Spara</label>
      <label for="addFeat" class="btn">Stäng</label>
    </div>
  </div>
</div>