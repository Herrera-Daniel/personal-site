<script lang="ts">
	import type { PageData } from './$types';

	import Calendar from '@/components/ui/calendar/calendar.svelte';
	import {
		DateFormatter,
		getLocalTimeZone,
		isSameDay,
		parseAbsoluteToLocal,
		Time,
		today,
		toTime,
		ZonedDateTime,
		type DateValue
	} from '@internationalized/date';

	export let data: PageData;
	let value: DateValue | undefined = today(getLocalTimeZone()).add({ days: 1 });
	let selectedTime: ZonedDateTime | undefined;

	const selectTime = (time: ZonedDateTime) => {
		selectedTime = time;
	};

	const formatTime = (date: Date) => {
		return new DateFormatter('en-US', { hour: 'numeric', hour12: true }).format(date);
	};

	const formatDate = (date: Date) => {
		return new DateFormatter('en-US').format(date);
	};

	$: eventsForToday = data.events
		.filter((e) => value && isSameDay(value, parseAbsoluteToLocal(e.start.dateTime)))
		.map((e) => ({
			summary: e.summary,
			start: parseAbsoluteToLocal(e.start.dateTime),
			end: parseAbsoluteToLocal(e.end.dateTime),
			hours:
				parseAbsoluteToLocal(e.end.dateTime).toDate().getHours() -
				parseAbsoluteToLocal(e.start.dateTime).toDate().getHours()
		}));
</script>

/** eslint-disable @typescript-eslint/no-unused-vars **/
<section class="flex flex-col gap-8">
	<h1 class="flex text-6xl sm:text-8xl mt-8 items-start">Schedule</h1>
	<h2 class="text-xl mt-6 sm:text-2xl">
		Use this calendar to select a day and time for a phone call or meeting, whichever works better
		for you.
	</h2>
	<div class="w-full flex justify-center">
		<div class="flex flex-col sm:flex-row border w-full sm:w-11/12 p-2 sm:p-12 rounded-md gap-12">
			<Calendar bind:value class="rounded-md border shawdow w-fit items-center" />
			{#if value}
				<div>
					-Get events for day -Display free slots -Input for email or phone -submit button
					{formatDate(value.toDate('America/Denver'))}
					{#if eventsForToday}
						{#each eventsForToday as event}
							<div class="grid grid-cols-3 gap-8">
								{#each { length: event.hours } as _, i}
									<button
										on:click={() => selectTime(event.start.add({ hours: 1 }))}
										class="text-center justify-center bg-secondary p-2 hover:bg-primary rounded-md"
									>
										{formatTime(event.start.add({ hours: i }).toDate())}
									</button>
								{/each}
							</div>
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</section>
