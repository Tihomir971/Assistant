import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
	const { session } = await parent();
	if (session) {
		throw redirect(303, '/dashboard');
	}

	const ip_api_result = await fetch('https://ipapi.co/json');
	const location = await ip_api_result.json();
	//	console.log('Location', location);
	const Latitude = 43.898376;
	const Longitude = 20.4137;
	const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${Latitude}&longitude=${Longitude}&hourly=temperature_2m&current_weather=true&windspeed_unit=ms`;
	//	console.log(weather_url);
	const weather_result = await fetch(weather_url);
	const weather = await weather_result.json();
	//	console.log('Weather', weather);
	return { location, weather };
}) satisfies PageLoad;
