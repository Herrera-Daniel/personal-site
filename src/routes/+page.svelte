<script>
	import me from '$lib/images/small_me.webp';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="Daniel Herrera" content="Daniel Herrera's personal site" />
</svelte:head>

<section>
	<div class="welcome">
		<div class="welcomeText">
			<h1>Hello and welcome, my name is Daniel Herrera.</h1>
		</div>
		<img class="welcomeImg" src={me} alt="me" />
	</div>
	<div class="description">
		<h2>
			I am a Software Engineer with 5 years of professional experience building enterprise level
			applications. I graduated in 2019 with degrees in Physics with an emphasis in Astronomy, and
			Software Engineering.
		</h2>

		Whatever your software needs, I can help. Make this part look good, lol, I don't know what that
		means right now.
	</div>

	<ul>
		<li>Website Design & Maintenance</li>
		<li>Application Consultation, Design, Implementation, Maintenance</li>
	</ul>

	<br />
	I also offer tutoring services and lessons for the following subjects:

	<ul>
		<li>Programming Lessons</li>
		<li>Programming Tutoring</li>
		<li>Math (Fundamentals, Geometry, Trigonometry & Calculus)</li>
		<li>Physics (All levels)</li>
		<li>Chemistry (Fundamentals)</li>
	</ul>
	If any of these services interest you, please feel free to contact me at daniel.herrera33@proton.me.
	Or use the<a href="/scheduler">scheduler</a> to request a meeting time.
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.description {
		display: flex;
		flex-direction: column;
		text-align: center;
		margin-top: 4em;
		width: 48em;
	}

	.welcome {
		display: inline-flex;
		gap: 8em;
	}

	.welcomeText {
		display: flex;
		justify-content: center;
		text-align: center;
		align-items: center;
		width: 36em;
	}

	.welcomeImg {
		width: 12em;
		height: 12em;
		border-radius: 50px;
	}
</style>
