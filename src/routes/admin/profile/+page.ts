import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('ad_user')
		.select()
		.eq('id', session.user.id)
		.single();

	return { profile };
}) satisfies PageLoad;
