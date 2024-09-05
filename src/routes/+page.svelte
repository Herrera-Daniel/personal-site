<script>
	import me from '$lib/images/small_me.webp';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="Daniel Herrera" content="Daniel Herrera's personal site" />
</svelte:head>

<section>
	<div class="welcomeContainer">
		<h1 class="welcome">Welcome</h1>
		<h2 class="welcomeTag">
			<span> My name is </span>
			<span class="welcomeName"> Daniel Herrera </span>
		</h2>
	</div>
	<div class="description">
		<h2>
			I am a Software Engineer with 5 years of professional experience building enterprise level
			applications. I graduated in 2019 with degrees in Physics with an emphasis in Astronomy, and
			Software Engineering.
		</h2>
	</div>

	<div class="services">
		<h3>
			I offer a variety of services, from tutoring and lessons to website development. If anything
			interests you please contact be at daniel.herrera@proton.me or use the
			<a href="/schedule">schedule</a> to request a meeting.
		</h3>

		<div class="serviceCard">
			<ul>
				<li>Website Design & Maintenance</li>
				<li>Application Consultation, Design, Implementation, Maintenance</li>
			</ul>
		</div>

		<br />
		<h3>I also offer tutoring services and lessons for the following subjects:</h3>

		<ul>
			<li>Programming Lessons</li>
			<li>Programming Tutoring</li>
			<li>Math (Fundamentals, Geometry, Trigonometry & Calculus)</li>
			<li>Physics (All levels)</li>
			<li>Chemistry (Fundamentals)</li>
		</ul>
		If any of these services interest you, please feel free to contact me at daniel.herrera33@proton.me.
		Or use the to request a meeting time.
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
	}

	.description {
		display: flex;
		flex-direction: column;
		width: 48em;
	}

	.serviceCard {
		background-color: gray;
		height: 10em;
		width: 12em;
		border-radius: 20px;
	}

	.welcomeContainer {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.welcome {
		font-size: 4em;
	}

	.welcomeTag {
		font-size: 2.5em;
	}

	.welcomeName {
		color: var(--color-theme-1);
	}
</style>
