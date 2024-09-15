import { CALENDAR_CLIENT_EMAIL, CALENDAR_PRIVATE_KEY } from '$env/static/private';
import { getLocalTimeZone, isSameDay, parseAbsoluteToLocal, today } from '@internationalized/date';
import { JWT, LoginTicket } from 'google-auth-library';
import { google } from 'googleapis';
import type { LayoutServerLoad } from './$types';

const SCOPES = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/calendar.events'
];

const CALENDAR_ID =
	'840dfa8a8e3b6e75c172d138cfb3a745ed64ce752bafe00e48a1bcd1865f9dc1@group.calendar.google.com';

const calendarAuth = new JWT({
	email: CALENDAR_CLIENT_EMAIL,
	key: CALENDAR_PRIVATE_KEY,
	scopes: SCOPES
});

type CalendarEvent = {
	summary: string;
	start: { dateTime: string; timeZone: string };
	end: { dateTime: string; timeZone: string };
	status: string;
};

export const load: LayoutServerLoad = async () => {
	const items = google
		.calendar({ version: 'v3' })
		.events.list({
			auth: calendarAuth,
			calendarId: CALENDAR_ID,
			showDeleted: false,
			singleEvents: true,
			maxResults: 100,
			timeMin: today(getLocalTimeZone()).toDate('America/Denver').toISOString(),
			orderBy: 'startTime'
		})
		.then((res) => res.data)
		.then((data) => {
			const items = data.items as CalendarEvent[];

			return items
				.filter((i) => i.summary === 'Free')
				.map((i) => {
					const startDate = parseAbsoluteToLocal(i.start.dateTime);
					const endDate = parseAbsoluteToLocal(i.end.dateTime);
					const hours = endDate.toDate().getHours() - startDate.toDate().getHours();
					const otherEventsOnDay = items.filter(
						(se) =>
							isSameDay(startDate, parseAbsoluteToLocal(se.start.dateTime)) && se.summary !== 'Free'
					);
					const times = [...Array(hours + 1).keys()].map((t) => {
						const hour = parseAbsoluteToLocal(i.start.dateTime).add({ hours: t });
						const reserved = otherEventsOnDay.find(
							(se) =>
								parseAbsoluteToLocal(se.start.dateTime).add({ hours: t }).toString() ===
								startDate.toString()
						);
						return {
							time: hour.toString(),
							reserved: reserved !== undefined
						};
					});

					return {
						summary: i.summary,
						start: i.start.dateTime,
						end: i.end.dateTime,
						times
					};
				});
		});

	return { events: items };
};
