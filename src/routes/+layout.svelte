<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<div class="app dark">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: hsl(20, 14.3%, 4.1%);
		color: white;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 4rem;
	}
</style>
