<script>
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="Daniel Herrera" content="Daniel Herrera's personal site" />
</svelte:head>

<section>Show a picture of me and a basic description</section>
<section>
	Show services, tutoring, website buiding, consultation, basic web security lessons
</section>
<section>
	Provide basic contact details, or a link to reserve a time frame to discuss services
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
