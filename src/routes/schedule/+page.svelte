<script lang="ts">
	import Calendar from '@/components/ui/calendar/calendar.svelte';
	import { getLocalTimeZone, today } from '@internationalized/date';

	let value = today(getLocalTimeZone());
</script>

<section class="flex flex-col items-center gap-8">
	<h1>This is where the schedule will go, still need to finalize design.</h1>
	<div class="flex flex-col sm:flex-row border w-10/12 p-8 rounded-md gap-12">
		<Calendar bind:value class="rounded-md border w-fit items-center" />
		{value}
	</div>
</section>
