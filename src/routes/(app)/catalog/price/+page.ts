import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const { data: pricelist, error } = await supabase.from('m_pricelist').select();
	if (error) {
		throw new Error(`Error: ${error}`);
	}
	return { pricelist };
}) satisfies PageLoad;
