import { convertToTreeStructure } from '$lib/utils/tree';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: categoryTable } = await supabase
		.from('m_product_category')
		.select('id,parent_id,text: name');
	const children = convertToTreeStructure(categoryTable);
	//	console.log('children', children);
	return { children, categoryTable, user: session.user };
}) satisfies LayoutLoad;
