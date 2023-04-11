import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent, depends, url }) => {
	//	const start = Date.now();
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const activeCategoryId = Number(url.searchParams.get('cat'));
	const activeWarehouseId = Number(url.searchParams.get('wh'));
	const onStock = url.searchParams.get('onStock') || 'true';
	//	const newUrl = new URL($page.url);
	//	newUrl?.searchParams?.set('cat', activeId.toString());
	//	goto(newUrl);
	const products:
		| {
				id: number | null;
				barcode: string | null;
				sku: string | null;
				name: string | null;
				qtyonhand: number | null;
				productprice: number | null;
				pricePo: number | null;
				taxRate: number | null;
				mpn: string | null;
		  }[] = [];

	let productQuery = supabase
		.from('m_product')
		.select(
			'id,barcode,mpn,sku,name,c_taxcategory_id,c_uom_id,m_storageonhand(warehouse_id,qtyonhand),m_productprice(m_pricelist_version_id,pricestd),m_product_po(pricelist),c_taxcategory(c_tax(rate))'
		)
		.order('name', { ascending: true })
		.eq('producttype', 'I');

	if (activeCategoryId === 0) {
		productQuery = productQuery.is('m_product_category_id', null);
	} else {
		productQuery = productQuery.eq('m_product_category_id', activeCategoryId);
	}
	const { data } = await productQuery;

	//console.log('error', error);
	data?.forEach((product) => {
		let qtyonhand = 0;
		let productprice = 0;
		let pricePo = 0;
		let taxRate = 0;
		//		console.log(typeof product.c_taxcategory);
		// let taxRate = product.c_taxcategory?[0]?.c_tax?[0]?;
		if (product.c_taxcategory_id === 2) {
			taxRate = 0.1;
		} else {
			taxRate = 0.2;
		}

		if (product.m_storageonhand && Array.isArray(product.m_storageonhand)) {
			product.m_storageonhand?.forEach((m_storageonhand) => {
				if (m_storageonhand.warehouse_id === activeWarehouseId) {
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
					pricePo = m_productprice.pricestd * (1 + taxRate);
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
			pricePo: pricePo,
			mpn: product.mpn,
			taxRate: taxRate
		});
	});
	depends('catalog:products');
	//	const end = Date.now();
	//	console.log(`(app)/page.ts - time: ${end - start} ms`);
	return { products };
}) satisfies PageLoad;
