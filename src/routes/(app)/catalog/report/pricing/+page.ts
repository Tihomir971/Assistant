import { activeId } from '$lib/stores/categoryStore';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

let activeCategory: number;
activeId.subscribe((value) => {
	activeCategory = value;
});

export const load = (async ({ parent, depends }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: products } = await supabase
		.from('m_product')
		.select('id,barcode,sku,name')
		.eq('m_product_category_id', activeCategory)
		.order('name');

	depends('load:products');

	if (products) {
		return { products };
	}
}) satisfies PageLoad;
