import type { LayoutLoad } from './$types';

export const load = (async () => {
	console.log('(app) Layout');
	return {};
}) satisfies LayoutLoad;
