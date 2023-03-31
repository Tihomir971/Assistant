import { activeId } from '$lib/stores/categoryStore';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

let activeCategory: number;
activeId.subscribe((value) => {
	activeCategory = value;
});

export const load = (async ({ parent, depends }) => {
	const products:
		| {
				id: number | null;
				barcode: string | null;
				sku: string | null;
				name: string | null;
				qtyonhand: number | null;
				productprice: number | null;
				pricePo: number | null;
				pricelist: number | null;
				/* 			m_storageonhand:
				| {
						warehouse_id: number;
						qtyonhand: number;
				  }[]
				| null;
			m_productprice:
				| {
						m_pricelist_version_id: number;
						pricestd: number;
				  }[]
				| null;
			m_product_po:
				| {
						pricelist: number;
				  }[]
				| null; */
		  }[] = [];

	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const { data } = await supabase
		.from('m_product')
		.select(
			'id,barcode,sku,name,m_storageonhand(warehouse_id,qtyonhand),m_productprice(m_pricelist_version_id,pricestd),m_product_po(pricelist),c_uom_id'
		)
		.order('name')
		.eq('m_product_category_id', activeCategory);
	//.eq('m_storageonhand.warehouse_id', 5)

	data?.forEach((product) => {
		let qtyonhand = 0;
		let productprice = 0;
		let pricelist = 0;
		let pricePo = 0;
		if (product.m_storageonhand && Array.isArray(product.m_storageonhand)) {
			product.m_storageonhand?.forEach((m_storageonhand) => {
				if (m_storageonhand.warehouse_id === 5) {
					qtyonhand = qtyonhand + m_storageonhand.qtyonhand;
				}
			});
		}

		if (product.m_productprice && Array.isArray(product.m_productprice)) {
			product.m_productprice?.forEach((m_productprice) => {
				if (m_productprice.m_pricelist_version_id === 13) {
					productprice = m_productprice.pricestd;
				}
			});
		}
		if (product.m_productprice && Array.isArray(product.m_productprice)) {
			product.m_productprice?.forEach((m_productprice) => {
				if (m_productprice.m_pricelist_version_id === 5) {
					pricePo = m_productprice.pricestd * 1.2;
				}
			});
		}
		if (product.m_product_po && Array.isArray(product.m_product_po)) {
			product.m_product_po?.forEach((m_product_po) => {
				if (m_product_po.pricelist && m_product_po.pricelist > 0) {
					pricelist = m_product_po.pricelist;
				}
			});
		}
		//const qtyonhand = Object.values(product.m_productprice).find(obj => obj.m_pricelist_version_id === 13))
		console.log(
			product.id,
			product.barcode,
			product.sku,
			product.name,
			qtyonhand,
			productprice,
			pricelist
		);
		products.push({
			id: product.id,
			barcode: product.barcode,
			sku: product.sku,
			name: product.name,
			qtyonhand: qtyonhand,
			productprice: productprice,
			pricelist: pricelist,
			pricePo: pricePo
		});

		console.log('products', products);
	});
	depends('catalog:products');

	return { products };
}) satisfies PageLoad;
