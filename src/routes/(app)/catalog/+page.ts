import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: categoryTable } = await supabase
		.from('m_product_category')
		.select('id,parent_id,text: name')
		.order('name');

	const { data: productData } = await supabase
		.from('m_product')
		.select('id,barcode,sku,name')
		.order('name');

	return { categoryTable, productData, user: session.user };
}) satisfies PageLoad;
