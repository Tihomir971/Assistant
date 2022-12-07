import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { attribute } from '$lib/api/attribute';

export const load: PageServerLoad = async (event) => {
	const { session } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}
	const { params } = event;
	const { id } = params;
	const atributeId = Number(id);

	return {
		rows: attribute.getById(atributeId),
		attribute_options: attribute.getAttributeOptions(atributeId)
	};
};
