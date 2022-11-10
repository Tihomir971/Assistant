import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: PageServerLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}
	const { params } = event;
	const { id } = params;

	const { data: rows } = await supabaseClient
		.from('eav_attribute')
		.select('id, isactive, code, name, backend_type, frontend_input, entity_type_id')
		.match({ id })
		.maybeSingle();
	console.log(rows);
	return {
		rows
	};
};