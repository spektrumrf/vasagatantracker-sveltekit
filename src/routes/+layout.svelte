<script lang="ts">
	import '../app.css';
	let menuOpen = false;
</script>

<div class="my-10">
	<div class="navbar bg-base-100">
		<div class="flex-none">
			<button
				class="btn btn-square btn-ghost"
				on:click={() => {
					menuOpen = !menuOpen;
				}}
			>
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
			<ul class="menu menu-horizontal p-0 {menuOpen ? 'visible' : ''}">
				<li><a>Item 1</a></li>
				<li tabindex="0">
					<ul class="p-2 bg-base-100">
						<li><a>Submenu 1</a></li>
						<li><a>Submenu 2</a></li>
					</ul>
				</li>
				<li><a>Item 3</a></li>
			</ul>
		</div>
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Vasagatantracker</a>
		</div>
	</div>
	<slot />
</div>
