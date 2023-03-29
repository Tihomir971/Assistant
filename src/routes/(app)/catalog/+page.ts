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
		.select(
			'id,barcode,sku,name,m_storageonhand(qtyonhand),m_productprice(m_pricelist_version_id,pricestd),m_product_po(pricelist)'
		)
		.order('name')
		.eq('m_product_category_id', activeCategory)
		.eq('m_storageonhand.warehouse_id', 5)
		.in('m_productprice.m_pricelist_version_id', [13])
		.order('m_pricelist_version_id', { foreignTable: 'm_productprice' });

	depends('catalog:products');

	return { products };
}) satisfies PageLoad;
