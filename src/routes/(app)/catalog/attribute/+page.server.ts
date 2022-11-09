import type { PageServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: rows } = await supabaseClient
		.from('eav_attribute')
		.select('id, isactive, code, name, backend_type, frontend_input, entity_type_id');
	return {
		rows
	};
};
