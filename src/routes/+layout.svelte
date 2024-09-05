<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: black;
		color: white;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
