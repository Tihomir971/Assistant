import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
type Product = {
	id: number;
	barcode: string | null;
	sku: string | null;
	name: string | null;
	qtyonhand: number;
	pricePurchase: number;
	oldPriceMarket?: number;
	priceMarket?: number;
	priceRetail: number;
	priceRecommended?: number;
	taxRate: number;
	mpn?: string | null;
};

export const load = (async ({ parent, depends, url }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	//Get searchParams
	const activeWarehouseId = url.searchParams.get('wh') ? Number(url.searchParams.get('wh')) : null;
	const onStock = url.searchParams.get('onStock') || 'true';
	const activeCategoryId = url.searchParams.get('cat') ? Number(url.searchParams.get('cat')) : null;

	const columns =
		'id,barcode,mpn,sku,name,c_taxcategory_id,c_uom_id,m_storageonhand(qtyonhand),qPriceRetail:m_productprice(pricestd),qPricePurchase:m_productprice(pricestd),qPriceMarket:m_productprice(pricelist),m_product_po(pricelist),c_taxcategory(c_tax(rate))';

	let query = supabase
		.from('m_product')
		.select(columns)
		.order('name', { ascending: true })
		.eq('producttype', 'I')
		.eq('m_storageonhand.warehouse_id', activeWarehouseId)
		.eq('qPriceRetail.m_pricelist_version_id', 13)
		.eq('qPricePurchase.m_pricelist_version_id', 5)
		.eq('qPriceMarket.m_pricelist_version_id', 15);
	query =
		typeof activeCategoryId === 'number'
			? query.eq('m_product_category_id', activeCategoryId)
			: query.is('m_product_category_id', null);

	const { data } = await query;
	console.log('data', data);

	const products: Product[] = [];
	data?.forEach((product) => {
		const {
			id,
			barcode,
			mpn,
			sku,
			name,
			c_taxcategory_id,
			m_storageonhand,
			qPriceRetail,
			qPricePurchase,
			qPriceMarket,
			m_product_po
		} = product;
		// Assign quantity  for product if exist
		let qtyonhand = 0;
		if (Array.isArray(m_storageonhand) && m_storageonhand?.length !== 0) {
			({ qtyonhand } = m_storageonhand[0]);
		}

		if (onStock === 'true' && !(qtyonhand > 0)) {
			return;
		}

		const taxRate = c_taxcategory_id === 2 ? 0.1 : 0.2;

		// Assign retail price for product if exist
		let priceRetail = 0;
		if (Array.isArray(qPriceRetail) && qPriceRetail?.length !== 0) {
			const { pricestd } = qPriceRetail[0];
			priceRetail = pricestd;
		}
		console.log('qPriceMarket', qPriceMarket);

		// Assign retail price for product if exist
		let priceMarket = 0;
		if (Array.isArray(qPriceMarket) && qPriceMarket?.length !== 0) {
			const { pricelist } = qPriceMarket[0];
			if (pricelist) {
				priceMarket = pricelist;
			}
		}

		// Assign quantity  for product if exist
		let pricePurchase = 0;
		if (Array.isArray(qPricePurchase) && qPricePurchase?.length !== 0) {
			const { pricestd } = qPricePurchase[0];
			pricePurchase = pricestd * (1 + taxRate);
		}

		// Assign quantity  for product if exist
		let oldPriceMarket = 0;
		if (Array.isArray(m_product_po) && m_product_po?.length > 0) {
			const { pricelist } = m_product_po[0];
			oldPriceMarket = pricelist;
		}

		let priceRecommended = 0;
		if (priceMarket === 0) {
			priceRecommended = pricePurchase * 1.3;
		} else if (priceMarket < pricePurchase) {
			priceRecommended = pricePurchase;
		} else if (priceMarket < pricePurchase * 1.3) {
			priceRecommended = priceMarket;
		} else {
			priceRecommended = pricePurchase * 1.3;
		}

		priceRecommended = Math.ceil(priceRecommended);
		if (priceRecommended < 2000) {
			priceRecommended = priceRecommended - 0.01;
		}

		products.push({
			id: id,
			barcode: barcode,
			sku: sku,
			name: name,
			qtyonhand: qtyonhand,
			priceRetail: priceRetail,
			pricePurchase: pricePurchase,
			oldPriceMarket: oldPriceMarket,
			priceMarket: priceMarket,
			priceRecommended: priceRecommended,
			mpn: mpn,
			taxRate: taxRate
		});
	});

	depends('catalog:products');
	return { products };
}) satisfies PageLoad;
