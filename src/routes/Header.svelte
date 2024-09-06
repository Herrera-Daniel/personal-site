<script>
	import logo from '$lib/images/logo2.png';
</script>

<div class="header">
	<a href="/"><img class="icon" src={logo} alt="logo" /></a>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/about">About</a></li>
			<li><a href="/schedule">Schedule</a></li>
		</ul>
	</nav>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 5em;
		margin: 0 16px;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: row;
		gap: 8px;
	}

	.icon {
		display: flex;
		align-items: center;
		height: 1.5em;
		width: 2.5em;
	}
</style>
