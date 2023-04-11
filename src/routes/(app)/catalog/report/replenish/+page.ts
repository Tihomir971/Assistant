import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
//import { get } from 'svelte/store';

export const load = (async ({ parent, depends, url }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const activeCategoryId = Number(url.searchParams.get('cat'));

	const onStock = url.searchParams.get('onStock') || 'true';

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
				taxRate: number | null;
				level_min: number | null;
				unitsperpack: number | null;
		  }[] = [];

	let productQuery = supabase
		.from('m_product')
		.select(
			'id,barcode,sku,name,unitsperpack,c_taxcategory_id,c_uom_id,m_storageonhand(warehouse_id,qtyonhand),m_productprice(m_pricelist_version_id,pricestd),m_product_po(pricelist),c_taxcategory(c_tax(rate)),m_replenish(m_warehouse_id,level_min)'
		)
		.order('name', { ascending: true })
		.eq('producttype', 'I');

	if (activeCategoryId === 0) {
		productQuery = productQuery.is('m_product_category_id', null);
	} else {
		productQuery = productQuery.eq('m_product_category_id', activeCategoryId);
	}
	const { data } = await productQuery;
	//	console.log('products', data);
	//console.log('error', error);

	data?.forEach((product) => {
		let qtyonhand = 0;
		let productprice = 0;
		let pricelist = 0;
		let pricePo = 0;
		let taxRate = 0;
		let level_min = 0;
		//		console.log(typeof product.c_taxcategory);
		// let taxRate = product.c_taxcategory?[0]?.c_tax?[0]?;
		if (product.c_taxcategory_id === 2) {
			taxRate = 0.1;
		} else {
			taxRate = 0.2;
		}

		if (product.m_storageonhand && Array.isArray(product.m_storageonhand)) {
			product.m_storageonhand?.forEach((m_storageonhand) => {
				if (m_storageonhand.warehouse_id === 5) {
					//if (m_storageonhand.warehouse_id === get(warehouseId)) {
					qtyonhand = qtyonhand + m_storageonhand.qtyonhand;
				}
			});
		}

		if (product.m_replenish && Array.isArray(product.m_replenish)) {
			product.m_replenish?.forEach((m_replenish) => {
				if (m_replenish.m_warehouse_id === 5) {
					//if (m_storageonhand.warehouse_id === get(warehouseId)) {
					level_min = m_replenish.level_min;
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
					pricePo = m_productprice.pricestd * (1 + taxRate);
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
		/* 		console.log(
			product.id,
			product.barcode,
			product.sku,
			product.name,
			qtyonhand,
			productprice,
			pricelist
		); */
		//		console.log(onStock === 'true', !(qtyonhand > 0), onStock === 'true' && !(qtyonhand > 0));

		if (onStock === 'true' && !(qtyonhand > 0)) {
			return;
		}

		products.push({
			id: product.id,
			barcode: product.barcode,
			sku: product.sku,
			name: product.name,
			qtyonhand: qtyonhand,
			productprice: productprice,
			pricelist: pricelist,
			pricePo: pricePo,
			taxRate: taxRate,
			level_min: level_min,
			unitsperpack: product.unitsperpack
		});
	});
	depends('catalog:products');
	return { products };
}) satisfies PageLoad;
