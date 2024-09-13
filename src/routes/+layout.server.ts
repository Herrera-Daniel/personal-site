import { CALENDAR_CLIENT_EMAIL, CALENDAR_PRIVATE_KEY } from '$env/static/private';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';
import type { LayoutServerLoad } from './$types.js';

const SCOPES = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/calendar.events'
];

type CalendarEvent = {
	summary: string;
	start: { dateTime: string; timeZone: string };
	end: { dateTime: string; timeZone: string };
	status: string;
};

type j = {
	items: CalendarEvent[];
};

const calendarAuth = new JWT({
	email: CALENDAR_CLIENT_EMAIL,
	key: CALENDAR_PRIVATE_KEY,
	scopes: SCOPES
});

export const load: LayoutServerLoad = async () => {
	const calendarId =
		'840dfa8a8e3b6e75c172d138cfb3a745ed64ce752bafe00e48a1bcd1865f9dc1@group.calendar.google.com';

	const events = (
		(await google
			.calendar({ version: 'v3' })
			.events.list({
				auth: calendarAuth,
				calendarId: calendarId,
				showDeleted: false,
				singleEvents: true,
				maxResults: 30
			})
			.then((res) => res.data)) as j
	).items;
	return { events };
};
