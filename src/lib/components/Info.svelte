<script lang="ts">
	export let info: any = {};
</script>

<div class="w-2/3 mx-auto text-center">
	<h3 class="font-bold text-2xl my-3">Vad?</h3>
	<p>{info.what || ''}</p>

	<h3 class="font-bold text-2xl my-3">Varför?</h3>
	<p>{info.why || ''}</p>

	<h3 class="font-bold text-2xl my-3">När?</h3>
	<p>{info.when || ''}</p>

	<h3 class="font-bold text-2xl my-3">Var?</h3>
	<p>{info.where || ''}</p>

	<h3 class="font-bold text-2xl my-3">Start?</h3>
	<p>{info.start || ''}</p>

	<h3 class="font-bold text-2xl my-3">Mål?</h3>
	<p>{info.finish || ''}</p>

	<h3 class="font-bold text-2xl my-3">Anmälan?</h3>
	<p>{info.registration || ''}</p>

	<h3 class="font-bold text-2xl my-3">Detaljerad info?</h3>
	<p><a class="link" href={info.details}>Approbatur i Vasagatan</a></p>

	<h3 class="font-bold text-2xl my-3">Viktig info!</h3>
	<p><a class="link" href={info.important}>Lyssna här</a></p>
</div>
