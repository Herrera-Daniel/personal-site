import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import {
	DateFormatter,
	getLocalTimeZone,
	isSameDay,
	parseAbsoluteToLocal,
	parseZonedDateTime,
	today
} from '@internationalized/date';
import {
	CALENDAR_CLIENT_EMAIL,
	CALENDAR_PRIVATE_KEY,
	EMAIL_API_KEY,
	EMAIL_DOMAIN
} from '$env/static/private';
import { JWT } from 'google-auth-library';
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

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

const mailgunAuth = {
	auth: {
		api_key: EMAIL_API_KEY,
		domain: EMAIL_DOMAIN
	}
};

const nodemailerMailgun = nodemailer.createTransport(mg(mailgunAuth));

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	await nodemailerMailgun.sendMail({
		from: 'mailgun@sandboxb377c6e2383f42359367d636f993f6f8.mailgun.org',
		to: 'daniel.herrera33@proton.me',
		subject: 'New Meeting Request',
		text: `Date: ${data.get('date')}\nTime: ${formatTimeFromString(
			data.get('startTime') as string
		)}\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}`
	});

	const timeZone = data.get('startTime')!.toString().slice(26, -1);
	const startTime = data.get('startTime')!.toString().slice(0, 25);
	const endTime = parseZonedDateTime(data.get('startTime') as string)
		.add({ hours: 1 })
		.toString()
		.slice(0, 25);

	await google.calendar({ version: 'v3' }).events.insert({
		auth: calendarAuth,
		calendarId: CALENDAR_ID,
		sendNotifications: true,
		sendUpdates: 'all',
		requestBody: {
			summary: `${data.get('name')} - ${data.get('service')}`,
			start: { dateTime: startTime, timeZone },
			end: { dateTime: endTime, timeZone },
			status: 'tentative'
		}
	});
	return json(null);
};

const formatTimeFromString = (time: string) => {
	return new DateFormatter('en-US', {
		hour: 'numeric',
		hour12: true,
		timeZone: 'America/Denver'
	}).format(parseZonedDateTime(time).toDate());
};
