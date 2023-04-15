import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const productId = Number(params.id);
	const { data: product } = await supabase
		.from('m_product')
		.select('id,sku,barcode,name,condition,m_product_category_id')
		.eq('id', productId)
		.maybeSingle();

	const { data: product_po } = await supabase
		.from('m_product_po')
		.select('id,c_bpartner_id,pricelist,vendorproductno,url,updated,c_bpartner(name)')
		.eq('m_product_id', productId);

	const { data: replenish } = await supabase
		.from('m_replenish')
		.select('id,m_warehouse_id,level_min,level_max,m_warehousesource_id')
		.eq('m_product_id', productId);

	const { data: storageonhand } = await supabase
		.from('m_storageonhand')
		.select('id,qtyonhand,created,updated,m_warehouse(code)')
		.eq('m_product_id', productId);

	return { product, product_po, replenish, storageonhand };
}) satisfies PageLoad;
