import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: PageLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: userTable } = await supabaseClient.from('ad_user').select('*');
	return {
		userTable,
		user: session.user
	};
};
