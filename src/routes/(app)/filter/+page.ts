import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data } = await supabase
		.from('m_product')
		.select(
			'id,barcode,mpn,sku,name,c_taxcategory_id,c_uom_id,m_storageonhand(warehouse_id,qtyonhand),m_productprice(m_pricelist_version_id,pricestd),m_product_po(pricelist),c_taxcategory(c_tax(rate))'
		)
		.order('name', { ascending: true })
		.eq('producttype', 'I')
		.eq('id', 759767)
		.filter('m_product_category_id', 'eq', 30);
	console.log('data', data);

	const { data: newFilter } = await supabase
		.from('m_product')
		.select(
			'id,barcode,mpn,sku,name,c_taxcategory_id,c_uom_id,m_storageonhand(qtyonhand),retailprice:m_productprice(pricestd),purchaseprice:m_productprice(pricestd),m_product_po(pricelist),c_taxcategory(c_tax(rate))'
		)
		.order('name', { ascending: true })
		.eq('producttype', 'I')
		.eq('id', 759031)
		.eq('m_storageonhand.warehouse_id', 2)
		.eq('retailprice.m_pricelist_version_id', 13)
		.eq('purchaseprice.m_pricelist_version_id', 5)
		.filter('m_product_category_id', 'eq', 30);
	console.log('newFilter', newFilter);

	return { data };
}) satisfies PageLoad;
