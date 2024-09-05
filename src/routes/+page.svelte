<svelte:head>
	<title>Home</title>
	<meta name="Daniel Herrera" content="Daniel Herrera's personal site" />
</svelte:head>

<section class="flex-col gap-8 w-10/12">
	<div class="flex-col">
		<h1 class="text-7xl md:text-8xl mt-8">Welcome</h1>
		<h2 class="text-5xl mt-6 md:text-6xl">
			<span> My name is </span>
			<span class="welcomeName"> Daniel Herrera </span>
		</h2>
	</div>
	<div class="mt-12">
		<h2 class="text-2xl">
			I am a Software Engineer with 5 years of professional experience building enterprise level
			applications. I graduated in 2019 with degrees in Physics with an emphasis in Astronomy, and
			Software Engineering.
		</h2>
	</div>

	<div>
		<h2 class="text-xl mt-8 mb-8">
			I offer a variety of services, from tutoring and lessons to website development. If anything
			interests you please contact be at daniel.herrera@proton.me or use the
			<a href="/schedule">schedule</a> to request a meeting.
		</h2>

		<div class="flex flex-col gap-4 max-w-md min-w-96 md:flex-row">
			<div class="bg-gray-800 rounded-2xl p-4">
				Technical services
				<ul>
					<li>Consultation</li>
					<li>Website Design & Maintenance</li>
					<li>Application Design, Implementation, Maintenance</li>
					<li>Database Design, Implementation, Maintenance</li>
				</ul>
			</div>

			<div class="bg-gray-800 rounded-2xl p-4">
				Tutoring services
				<ul>
					<li>Programming Lessons</li>
					<li>Programming Tutoring</li>
					<li>Math (Fundamentals, Geometry, Trigonometry & Calculus)</li>
					<li>Physics (All levels)</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<style>
	.welcomeName {
		color: var(--color-theme-1);
	}
</style>
