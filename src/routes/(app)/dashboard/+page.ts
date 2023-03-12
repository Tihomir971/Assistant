import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: testTable } = await supabase.from('m_product').select('*');
	return {
		testTable,
		user: session.user
	};
};
