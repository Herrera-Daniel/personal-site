import type { PageServerLoad } from './$types';

import { API_KEY } from '$env/static/private';

type CalendarEvent = {
	summary: string;
	start: { dateTime: string; timeZone: string };
	end: { dateTime: string; timeZone: string };
};

type j = {
	items: CalendarEvent[];
};

export const load: PageServerLoad = async () => {
	const calendarId =
		'840dfa8a8e3b6e75c172d138cfb3a745ed64ce752bafe00e48a1bcd1865f9dc1@group.calendar.google.com';

	const res = await fetch(
		'https://www.googleapis.com/calendar/v3/calendars/' +
			calendarId +
			'/events?singleEvents=true&maxResults=25&orderBy=startTime&key=' +
			API_KEY
	);
	const events = ((await res.json()) as j).items;

	return { events };
};
