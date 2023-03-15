<script lang="ts">
const countDownDate = new Date("2023-03-23T16:45:00").getTime();

let distance: number, days: number, hours: number, minutes: number, seconds: number;
countdown();
const interval = setInterval(countdown, 1000);

function countdown() {
  const now = new Date().getTime();
  distance = countDownDate - now;
  days = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (distance < 0) {
    clearInterval(interval);
  }
}
</script>

<div class="text-center text-lg alert flex flex-col">
  <div class="font-bold text-2xl">
    Tid till Approbatur i Vasagatan
  </div>
  {#if distance >= 0}
    <div class="grid grid-flow-col text-center auto-cols-max justify-center">
      <div class="flex flex-col p-2 rounded-box text-primary-focus">
        <span class="countdown font-mono text-3xl">
          <span style={`--value:${days};`}></span>
        </span>
        d
      </div> 
      <div class="flex flex-col p-2 rounded-box text-primary-focus">
        <span class="countdown font-mono text-3xl">
          <span style={`--value:${hours};`}></span>
        </span>
        h
      </div> 
      <div class="flex flex-col p-2 rounded-box text-primary-focus">
        <span class="countdown font-mono text-3xl">
          <span style={`--value:${minutes};`}></span>
        </span>
        min
      </div> 
      <div class="flex flex-col p-2 rounded-box text-primary-focus">
        <span class="countdown font-mono text-3xl">
          <span style={`--value:${seconds};`}></span>
        </span>
        sec
      </div>
    </div>
  {:else if distance < 0}
    <div>
      Vasagatan har börjat!
    </div>
  {/if}
</div>
