<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<div class="bg-background text-white min-h-screen dark">
	<Header />
	<main class="p-8 sm:p-16">
		<slot />
	</main>
</div>

<style>
</style>
