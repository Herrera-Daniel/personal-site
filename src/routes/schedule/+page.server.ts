import type { PageServerLoad } from './$types';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import { DateFormatter, parseZonedDateTime } from '@internationalized/date';

import {
	CALENDAR_API_KEY,
	CALENDAR_CLIENT_EMAIL,
	CALENDAR_PRIVATE_KEY,
	EMAIL_API_KEY,
	EMAIL_DOMAIN
} from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

type CalendarEvent = {
	summary: string;
	start: { dateTime: string; timeZone: string };
	end: { dateTime: string; timeZone: string };
};

type j = {
	items: CalendarEvent[];
};

const mailgunAuth = {
	auth: {
		api_key: EMAIL_API_KEY,
		domain: EMAIL_DOMAIN
	}
};

const SCOPES = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/calendar.events'
];

const nodemailerMailgun = nodemailer.createTransport(mg(mailgunAuth));

export const load: PageServerLoad = async () => {
	const calendarId =
		'840dfa8a8e3b6e75c172d138cfb3a745ed64ce752bafe00e48a1bcd1865f9dc1@group.calendar.google.com';

	const res = await fetch(
		'https://www.googleapis.com/calendar/v3/calendars/' +
			calendarId +
			'/events?singleEvents=true&maxResults=25&orderBy=startTime&key=' +
			CALENDAR_API_KEY
	);
	const events = ((await res.json()) as j).items;

	return { events };
};

export const actions = {
	default: async ({ request }) => {
		const calendarId =
			'840dfa8a8e3b6e75c172d138cfb3a745ed64ce752bafe00e48a1bcd1865f9dc1@group.calendar.google.com';
		const data = await request.formData();
		console.log('server', data);
		nodemailerMailgun.sendMail({
			from: 'mailgun@sandboxb377c6e2383f42359367d636f993f6f8.mailgun.org',
			to: 'daniel.herrera33@proton.me',
			subject: 'New Meeting Request',
			text: `Date: ${data.get('date')}\nTime: ${formatTime(data.get('startTime') as string)}\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}`
		});

		const auth = new JWT({
			email: CALENDAR_CLIENT_EMAIL,
			key: CALENDAR_PRIVATE_KEY,
			scopes: SCOPES
		});

		const timeZone = data.get('startTime')!.toString().slice(26, -1);
		const startTime = data.get('startTime')!.toString().slice(0, 25);
		const endTime = parseZonedDateTime(data.get('startTime') as string)
			.add({ hours: 1 })
			.toString()
			.slice(0, 25);

		google.calendar({ version: 'v3' }).events.insert(
			{
				auth: auth,
				calendarId: calendarId,
				sendUpdates: 'all',
				requestBody: {
					summary: `${data.get('name')} - ${data.get('service')}`,
					start: { dateTime: startTime, timeZone },
					end: { dateTime: endTime, timeZone },
					status: 'tentative'
				}
			},
			(err, event) => {
				if (err) {
					console.log(err);
					alert('Something went wrong, please try again.');
					return;
				}
				redirect(303, '/schedule/reserved');
			}
		);
	}
};

const formatTime = (time: string) => {
	return new DateFormatter('en-US', { hour: 'numeric', hour12: true }).format(
		parseZonedDateTime(time).toDate()
	);
};
