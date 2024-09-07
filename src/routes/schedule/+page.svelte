<script lang="ts">
	import Calendar from '@/components/ui/calendar/calendar.svelte';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { onMount } from 'svelte';
	// let clientId = 998040476943 - m1facd6frhvitobs3mjvledc7o95lt19.apps.googleusercontent.com;
	let events;
	onMount(async () => {
		const json = await fetch(
			'https://www.googleapis.com/calendar/v3/calendars/840dfa8a8e3b6e75c172d138cfb3a745ed64ce752bafe00e48a1bcd1865f9dc1@group.calendar.google.com/events?key=AIzaSyAS33oLUiCCxDVj5Lyo3gex1kG-VVad7_4'
		).then((res) => res.json());
		events = json.items;
	});

	let value = today(getLocalTimeZone());
</script>

<section class="flex flex-col gap-8">
	<h1 class="flex text-6xl sm:text-8xl mt-8 items-start">Schedule</h1>
	<h2 class="text-xl mt-6 sm:text-2xl">
		Use this calendar to select a day and time for a phone call or meeting, whichever works better
		for you.
	</h2>
	<div class="w-full flex justify-center">
		<div class="flex flex-col sm:flex-row border w-full sm:w-11/12 p-2 sm:p-12 rounded-md gap-12">
			<Calendar bind:value class="rounded-md border shawdow w-fit items-center" />
			<div>
				-Get events for day -Display free slots -Input for email or phone -submit button
				{value}
				{#if events}
					{#each events as event}
						<div>{event.summary}</div>
						<div>{event.start.dateTime}</div>
						<div>{event.end.dateTime}</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</section>
