import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: categoryTable } = await supabase
		.from('m_product_category')
		.select('id,parent_id,name');
	return { categoryTable, user: session.user };
}) satisfies LayoutLoad;
