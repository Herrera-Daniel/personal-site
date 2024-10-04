import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import { getLocalTimeZone, isSameDay, parseAbsoluteToLocal, today } from '@internationalized/date';
import { CALENDAR_CLIENT_EMAIL, CALENDAR_PRIVATE_KEY } from '$env/static/private';
import { JWT } from 'google-auth-library';
import { json } from '@sveltejs/kit';

const SCOPES = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/calendar.events'
];
const CALENDAR_ID =
	'840dfa8a8e3b6e75c172d138cfb3a745ed64ce752bafe00e48a1bcd1865f9dc1@group.calendar.google.com';

type CalendarEvent = {
	summary: string;
	start: { dateTime: string; timeZone: string };
	end: { dateTime: string; timeZone: string };
	status: string;
};

const calendarAuth = new JWT({
	email: CALENDAR_CLIENT_EMAIL,
	key: CALENDAR_PRIVATE_KEY,
	scopes: SCOPES
});

export const GET: RequestHandler = async () => {
	const items = await google
		.calendar({ version: 'v3' })
		.events.list({
			//@ts-expect-error Idk why
			auth: calendarAuth,
			calendarId: CALENDAR_ID,
			showDeleted: false,
			singleEvents: true,
			maxResults: 60,
			timeMin: today(getLocalTimeZone()).toDate('America/Denver').toISOString(),
			orderBy: 'startTime'
		})
		.then((res) => res.data)
		.then((data) => {
			//@ts-expect-error I know what this data is shaped like
			const events = data.items as CalendarEvent[];

			return events
				.filter((i) => i.summary === 'Free')
				.map((i) => {
					const startTime = parseAbsoluteToLocal(i.start.dateTime);
					const endTime = parseAbsoluteToLocal(i.end.dateTime);
					let hours = endTime.toDate().getHours() - startTime.toDate().getHours();
					if (hours < 0) {
						hours = hours + 24;
					}
					if (hours > 24) {
						hours = hours - 24;
					}
					const otherEventsOnDay = events.filter(
						(se) =>
							isSameDay(startTime, parseAbsoluteToLocal(se.start.dateTime)) && se.summary !== 'Free'
					);

					const times = [...Array(hours).keys()].map((t) => {
						const hour = parseAbsoluteToLocal(i.start.dateTime).add({ hours: t });
						const reserved = otherEventsOnDay.find(
							(se) => parseAbsoluteToLocal(se.start.dateTime).toString() === hour.toString()
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
						times: times.filter((t) => !t.reserved).map((t) => t.time)
					};
				});
		});

	return json(items);
};
