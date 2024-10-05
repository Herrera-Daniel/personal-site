<script lang="ts">
	import Calendar from '@/components/ui/calendar/calendar.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { Label } from '@/components/ui/label';
	import {
		Select,
		SelectContent,
		SelectGroup,
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
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	type CalendarEvent = {
		summary: string;
		start: string;
		end: string;
		times: string[];
	};
	let events: CalendarEvent[] | null = null;
	let selectedDate: DateValue | undefined;
	let selectedStartTime: string = '';
	let selectedService: { value: string; label: string } | undefined;
	let name: string | undefined;
	let email: string | undefined;
	let loading: boolean = false;

	onMount(async () => {
		events = await fetch('/api/schedule').then((res) => res.json());
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

<div class="flex flex-col gap-6">
	<h1 class="text-2xl sm:text-4xl">Schedule</h1>
	<h2 class="sm:text-xl mb-8">
		Use this calendar to select a time that works best for you. All times are in Mountain time.
		<br /><br />
		I'll confirm your time and details by email as promptly as possible.
	</h2>
	<div class="w-full flex-col flex items-center">
		<div
			class="flex flex-col md:flex-row min-h-[26rem] sm:min-w-[640px] max-w-4xl border w-full px-2 py-4 sm:p-12 rounded-md gap-12 text-center"
		>
			{#if !events || loading}
				<div class="m-auto">Loading...</div>
			{:else}
				<div class="flex h-full justify-center">
					<Calendar
						bind:value={selectedDate}
						class="rounded-md border shawdow w-fit h-fit items-center"
					/>
				</div>
				<div class="flex flex-col w-full gap-8 justify-center">
					<form
						class="flex flex-col gap-8"
						method="POST"
						use:enhance={({ formElement }) => {
							loading = true;
							invalidateAll();
							return async ({ update }) => {
								update();
								formElement.reset();
								formElement.replaceWith(
									"Thanks for reserving a meeting time, I'll get back to you as soon as I can."
								);
								loading = false;
							};
						}}
					>
						{#if !selectedDate}
							<div class="flex justify-center text-center w-full">Please select a date</div>
						{:else}
							{#each events as event}
								{#if isSameDay(parseAbsoluteToLocal(event.start), selectedDate)}
									{#if event.times.length === 0}
										No available times
									{/if}
									{#if event.times.length !== 0}
										Available times for {formatDate(selectedDate.toDate('America/Denver'))}
										<ToggleGroup
											class="grid grid-cols-2 sm:grid-cols-3 gap-2"
											bind:value={selectedStartTime}
										>
											{#each event.times as time}
												<ToggleGroupItem
													class="border data-[state=on]:border-primary data-[state=on]:bg-background p-8"
													value={time}
												>
													<Label class="text-white">
														{formatTime(time).toString()}
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
										<Input
											required
											name="email"
											type="email"
											placeholder="Email"
											bind:value={email}
										/>
										<input hidden name="date" bind:value={selectedDate} />
										<input hidden name="startTime" bind:value={selectedStartTime} />
										{#if selectedService}
											<input hidden name="service" bind:value={selectedService.label} />
										{/if}
										<button
											disabled={!selectedService ||
												selectedStartTime.length === 0 ||
												!name ||
												!email}
											class="p-2 rounded-md border bg-primary disabled:bg-secondary"
											>Submit
										</button>
									{/if}
								{/if}
							{/each}
						{/if}
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>
