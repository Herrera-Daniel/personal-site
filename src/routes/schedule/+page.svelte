<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	import Calendar from '@/components/ui/calendar/calendar.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { Label } from '@/components/ui/label';
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectLabel,
		SelectTrigger,
		SelectValue
	} from '@/components/ui/select';
	import SelectItem from '@/components/ui/select/select-item.svelte';
	import { ToggleGroupItem } from '@/components/ui/toggle-group';
	import ToggleGroup from '@/components/ui/toggle-group/toggle-group.svelte';
	import {
		DateFormatter,
		type DateValue,
		isSameDay,
		parseAbsoluteToLocal,
		parseZonedDateTime
	} from '@internationalized/date';
	import { onMount } from 'svelte';

	type CalendarEvent = {
		summary: string;
		start: { dateTime: string; timeZone: string };
		end: { dateTime: string; timeZone: string };
		status: string;
	};
	let events: CalendarEvent[] | null = null;
	let selectedDate: DateValue | undefined;
	let selectedStartTime: string = '';
	let selectedService: { value: string; label: string } | undefined;
	let name: string | undefined;
	let email: string | undefined;

	onMount(async () => {
		const calData = await fetch('/api/schedule').then((res) => res.json());
		events = calData;
	});

	const formatTime = (time: string) => {
		return new DateFormatter('en-US', { hour: 'numeric', hour12: true }).format(
			parseZonedDateTime(time).toDate()
		);
	};

	const formatDate = (date: Date) => {
		return new DateFormatter('en-US').format(date);
	};
</script>

<svelte:head>
	<title>Schedule</title>
	<meta name="description" content="Schedule a meeting time" />
</svelte:head>

<h2 class="text-lg sm:text-xl mb-8">
	Use this calendar to select a time that works best for you. All times are in Mountain time.
</h2>
<div class="w-full flex-col flex items-center">
	{#if !events}
		<div
			class="flex flex-col md:flex-row border h-[25rem] items-center justify-center max-w-4xl w-full sm:w-11/12 p-2 sm:p-12 rounded-md gap-12"
		>
			Loading...
		</div>
	{:else}
		<div
			class="flex flex-col md:flex-row border max-w-4xl w-full sm:w-11/12 px-2 py-4 sm:p-12 rounded-md gap-12"
		>
			<div class="flex justify-center">
				<Calendar
					bind:value={selectedDate}
					class="rounded-md border shawdow w-fit h-fit items-center"
				/>
			</div>
			<div class="flex flex-col w-full gap-8 justify-center">
				<form class="flex flex-col gap-8" method="POST" use:enhance>
					{#if !selectedDate}
						<div class="flex justify-center items-center w-full">Please Select a date.</div>
					{/if}
					{#each events as event}
						{#if event.times.length === 0}
							No available times
						{/if}
						{#if selectedDate && isSameDay(parseAbsoluteToLocal(event.start), selectedDate)}
							Available times for {formatDate(selectedDate.toDate('America/Denver'))}
							<ToggleGroup
								class="grid grid-cols-2 sm:grid-cols-3 gap-2"
								bind:value={selectedStartTime}
							>
								{#each event.times as time}
									<ToggleGroupItem
										class="border data-[state=on]:border-primary data-[state=on]:bg-background p-8"
										value={time.time}
									>
										<Label class="text-white">
											{formatTime(time.time).toString()}
										</Label>
									</ToggleGroupItem>
								{/each}
							</ToggleGroup>
							<Select bind:selected={selectedService}>
								<SelectTrigger>
									<SelectValue placeholder="Select a service" />
								</SelectTrigger>
								<SelectContent class="dark">
									<SelectGroup>
										<SelectLabel>Technical Services</SelectLabel>
										<SelectItem value="website">Website Development</SelectItem>
										<SelectItem value="app">Application Development</SelectItem>
										<SelectItem value="db">Database Development</SelectItem>
									</SelectGroup>
									<SelectGroup>
										<SelectLabel>Tutoring Services</SelectLabel>
										<SelectItem value="math">Math Tutoring</SelectItem>
										<SelectItem value="coding">Programming Lessons/Tutoring</SelectItem>
										<SelectItem value="physics">Physics Tutoring</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<Input required name="name" placeholder="Name" bind:value={name} />
							<Input required name="email" type="email" placeholder="Email" bind:value={email} />
							<input hidden name="date" bind:value={selectedDate} />
							<input hidden name="startTime" bind:value={selectedStartTime} />
							{#if selectedService}
								<input hidden name="service" bind:value={selectedService.label} />
							{/if}
							<button
								disabled={!selectedService || selectedStartTime.length === 0 || !name || !email}
								class="p-2 rounded-md border bg-primary disabled:bg-secondary">Submit</button
							>
						{/if}
					{/each}
				</form>
			</div>
		</div>
	{/if}
</div>
