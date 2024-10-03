<script>
	import { Tabs, TabsList } from '@/components/ui/tabs';
	import TabsContent from '@/components/ui/tabs/tabs-content.svelte';
	import TabsTrigger from '@/components/ui/tabs/tabs-trigger.svelte';
	import resume from '@/resume/resume.pdf';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="Daniel Herrera" content="Daniel Herrera's personal site" />
</svelte:head>

<section class="flex flex-col gap-4 max-w-[750px]">
	<h1 class="text-2xl sm:text-4xl">Welcome</h1>
	<h2 class="text-xl sm:text-2xl">
		<span> My name is </span>
		<span class="text-primary"> <a href={resume} download>Daniel Herrera</a></span>
	</h2>
	<p class="sm:text-lg">
		If you're looking for my resume, you can download it <a
		class="text-primary"
		download
		href={resume}
	>here</a
	>. <br /> <br />
		I am a Software Engineer with 5 years of professional experience building enterprise level
		applications.
	</p>

	<p class="sm:text-lg">
		If you need help with college prep, have software problems, or just want to learn something new,
		I'm here to help. I offer a variety of services, from tutoring and lessons, to website and
		application development. <br /> <br /> You can email me
		<a class="text-primary" type="email" href="mailto:daniel.herrera33@proton.me">here</a>
		or use the <a class="text-primary" href="/schedule">schedule</a> to request a phone call or
		meeting to discuss quotes. <br />
	</p>

	<div class="w-full flex justify-center">
		<Tabs value="services" class="w-80 sm:w-[550px]">
			<TabsList class="w-full grid grid-cols-2">
				<TabsTrigger value="services">Services</TabsTrigger>
				<TabsTrigger value="tutoring">Tutoring</TabsTrigger>
			</TabsList>
			<TabsContent value="services" class="border p-6 rounded-md min-h-56">
				From concept to implementation.<br /> <br />- Want an personal website?<br />- Need a
				digital space for your business?<br />- Need an
				application on the App or Play store? <br /> <br /> I can help you express yourself
				digitally.
			</TabsContent>
			<TabsContent value="tutoring" class="border p-6 rounded-md min-h-56">
				Tutoring for students (or adults looking to learn something new!).
				<br /> <br />- Math most levels <br />- Physics all levels<br />- Computer
				science/programming
				all levels
			</TabsContent>
		</Tabs>
	</div>
</section>
