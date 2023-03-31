import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data } = await supabase.from('c_uom').select('id,name,uomsymbol').order('name');

	console.log('newStore', data);
	return {};
}) satisfies LayoutLoad;
