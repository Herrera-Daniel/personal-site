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

{#if !events}
	<div class="m-auto">Loading...</div>
{:else}
	<div class="flex h-full justify-center">
		<Calendar
			bind:value={selectedDate}
			class="rounded-md border shawdow w-fit h-fit items-center"
		/>
	</div>
	<div class="flex flex-col w-full gap-8 justify-center">
		<form class="flex flex-col gap-8" method="POST" use:enhance>
			{#if !selectedDate}
				<div class="flex justify-center text-center w-full">Please select a date</div>
			{/if}
			{#each events as event}
				{#if event.times.length === 0}
					No available times
				{/if}
				{#if selectedDate && isSameDay(parseAbsoluteToLocal(event.start), selectedDate)}
					Available times for {formatDate(selectedDate.toDate('America/Denver'))}
					<ToggleGroup class="grid grid-cols-2 sm:grid-cols-3 gap-2" bind:value={selectedStartTime}>
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
								<SelectItem value="website">Website/Application Development</SelectItem>
								<SelectItem value="math">Math Tutoring</SelectItem>
								<SelectItem value="coding">Programming Tutoring</SelectItem>
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
{/if}
