<script>
	import { Accordion } from '@/components/ui/accordion';
	import AccordionContent from '@/components/ui/accordion/accordion-content.svelte';
	import AccordionItem from '@/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '@/components/ui/accordion/accordion-trigger.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="Daniel Herrera" content="Daniel Herrera's personal site" />
</svelte:head>

<section class="flex-col gap-8">
	<div class="flex-col">
		<h1 class="text-6xl sm:text-8xl mt-8">Welcome</h1>
		<h2 class="text-4xl mt-6 sm:text-6xl">
			<span> My name is </span>
			<span class="welcomeName"> Daniel Herrera </span>
		</h2>
	</div>
	<div class="mt-12">
		<h2 class="text-xl sm:text-2xl">
			I am a Software Engineer with 5 years of professional experience building enterprise level
			applications. I graduated in 2019 with degrees in Physics with an emphasis in Astronomy, and
			Software Engineering.
		</h2>
	</div>

	<div>
		<h2 class="text-xl sm:text-2xl mt-8 mb-8">
			I offer a variety of services, from tutoring and lessons, to website and application
			development. If anything interests you please contact be at daniel.herrera@proton.me or use
			the <a class="underline" href="/schedule">schedule</a> to request a meeting.
		</h2>

		<div class="text-lg sm:text-xl bg-gray-800 rounded-2xl p-6 w-full">
			<Accordion>
				<AccordionItem value="item-1">
					<AccordionTrigger>Technical Services</AccordionTrigger>
					<AccordionContent>Website Design, Implementation, and Maintenance</AccordionContent>
					<AccordionContent>Application Design, Implementation, and Maintenance</AccordionContent>
					<AccordionContent>Database Design, Implementation, and Maintenance</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger>Tutoring & Lessons</AccordionTrigger>
					<AccordionContent>Programming lessons - Intro to Advanced</AccordionContent>
					<AccordionContent>Physics Tutoring - High School to Advanced</AccordionContent>
					<AccordionContent>Math Tutoring - Middle School to College prep</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
</section>

<style>
	.welcomeName {
		color: var(--color-theme-1);
	}

	h2 > a {
		color: var(--color-theme-1);
	}
</style>
