<script lang="ts">
	import type { PageData } from './$types';

	import { Button } from '@/components/ui/button';
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
	import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
	import {
		DateFormatter,
		isSameDay,
		parseAbsoluteToLocal,
		type DateValue
	} from '@internationalized/date';

	export let data: PageData;
	let selectedDate: DateValue | undefined;
	let selectedTime: string | undefined;
	let selectedService: { value: { value: string; label: string } } | undefined;
	let name: string | undefined;

	const formatTime = (date: Date) => {
		return new DateFormatter('en-US', { hour: 'numeric', hour12: true }).format(date);
	};

	const formatDate = (date: Date) => {
		return new DateFormatter('en-US').format(date);
	};

	$: eventsForToday = data.events
		.filter((e) => selectedDate && isSameDay(selectedDate, parseAbsoluteToLocal(e.start.dateTime)))
		.map((e) => ({
			summary: e.summary,
			start: parseAbsoluteToLocal(e.start.dateTime),
			end: parseAbsoluteToLocal(e.end.dateTime),
			hours:
				parseAbsoluteToLocal(e.end.dateTime).toDate().getHours() -
				parseAbsoluteToLocal(e.start.dateTime).toDate().getHours()
		}));

	$: console.log(name);
</script>

<section class="flex flex-col gap-8">
	<h1 class="flex text-6xl sm:text-8xl mt-8 items-start">Schedule</h1>
	<h2 class="text-xl mt-6 sm:text-2xl">
		Use this calendar to select a day and time for a phone call or meeting, whichever works better
		for you.
	</h2>
	<div class="w-full flex justify-center">
		<div class="flex flex-col md:flex-row border w-full sm:w-11/12 p-2 sm:p-12 rounded-md gap-12">
			<div class="flex justify-center">
				<Calendar bind:value={selectedDate} class="rounded-md border shawdow w-fit items-center" />
			</div>
			{#if selectedDate}
				{#if eventsForToday}
					<div class="flex flex-col w-full gap-8">
						{#each eventsForToday as event}
							Available times for {formatDate(selectedDate.toDate('America/Denver'))}
							<ToggleGroup bind:value={selectedTime}>
								<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
								{#each { length: event.hours } as _, i}
									<ToggleGroupItem
										class="border data-[state=on]:border-primary data-[state=on]:bg-background p-8"
										value={formatTime(event.start.add({ hours: i }).toDate())}
									>
										<Label class="text-white">
											{formatTime(event.start.add({ hours: i }).toDate())}
										</Label>
									</ToggleGroupItem>
								{/each}
							</ToggleGroup>
						{/each}
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
						<Input placeholder="Name" bind:value={name} />
						<Button
							disabled={!selectedDate ||
								!selectedTime ||
								!selectedService ||
								!name ||
								name.length === 0}>Submit</Button
						>
					</div>
				{/if}
			{/if}
			{#if !selectedDate}
				<div class="flex justify-center items-center w-full">Please Select a date.</div>
			{/if}
		</div>
	</div>
</section>
