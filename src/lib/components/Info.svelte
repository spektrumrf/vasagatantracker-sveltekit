<script lang="ts">
  export let info = {};
</script>

<div class="prose">
	<h3>Vad?</h3>
	<p>{info.what}</p>

	<h3>Varför?</h3>
	<p>{info.why}</p>

	<h3>När?</h3>
	<p>{info.when}</p>

	<h3>Var?</h3>
	<p>{info.where}</p>

	<h3>Start?</h3>
	<p>{info.start}</p>

	<h3>Mål?</h3>
	<p>{info.finish}</p>

	<h3>Anmälan?</h3>
	<p>{info.registration}</p>

	<h3>Detaljerad info?</h3>
	<p><a href={info.details}>Approbatur i Vasagatan</a></p>

	<h3>Viktig info!</h3>
	<p><a href={info.important}>Lyssna här</a></p>
</div>
