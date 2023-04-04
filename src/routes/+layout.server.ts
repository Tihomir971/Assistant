import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	console.log('routes/+layout.server.ts');
	return {
		session: getSession()
	};
};
