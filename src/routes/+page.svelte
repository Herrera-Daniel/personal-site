<script>
	import { Accordion } from '@/components/ui/accordion';
	import AccordionContent from '@/components/ui/accordion/accordion-content.svelte';
	import AccordionItem from '@/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '@/components/ui/accordion/accordion-trigger.svelte';
	import resume from '@/resume/resume.pdf';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="Daniel Herrera" content="Daniel Herrera's personal site" />
</svelte:head>

<section class="flex flex-col gap-6">
	<h1 class="text-2xl sm:text-4xl">Welcome</h1>
	<h2 class="text-xl sm:text-2xl">
		<span> My name is </span>
		<span class="text-primary"> <a href={resume} download>Daniel Herrera</a></span>
	</h2>
	<p class="sm:text-lg">
		If you're looking for my resume, you can download it <a
			class="text-primary"
			download
			href={resume}>here</a
		>. <br /> <br />
		I am a Software Engineer with 5 years of professional experience building enterprise level applications.
		I have two bachelors degrees in Physics with an emphasis in Astronomy, and Software Engineering.
	</p>

	<p class="sm:text-lg">
		If you want help with college prep, have a software problems, or just want to learn something
		new, I'm here to help. I offer a variety of services, from tutoring and lessons, to website and
		application development. <br /> <br /> You can email me
		<a class="text-primary" type="email" href="mailto:daniel.herrera33@proton.me">here</a>
		or use the <a class="text-primary" href="/schedule">schedule</a> to request a phone call or
		meeting to discuss quotes. <br />
	</p>

	<div class="flex text-lg sm:text-xl justify-center mt-4">
		<Accordion class="w-10/12">
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
</section>
