<script>
	import Header from '@/components/ui/header/Header.svelte';
	import '../app.css';
</script>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<div class="bg-background text-white min-h-screen dark">
	<Header />
	<main class="p-6 w-full flex justify-center sm:p-16">
		<div class="w-full sm:w-[75%]">
			<slot />
		</div>
	</main>
</div>

<style>
</style>
