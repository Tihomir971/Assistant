import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const start = Date.now();
	console.log('(app)/+layout.ts');
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const end = Date.now();
	console.log(`(app)/page.ts - time: ${end - start} ms`);
	//const { data } = await supabase.from('c_uom').select('id,name,uomsymbol').order('name');

	//console.log('newStore', data);
	return {};
}) satisfies LayoutLoad;
