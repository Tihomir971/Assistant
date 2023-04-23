import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
type Product = {
	id: number | null;
	barcode: string | null;
	sku: string | null;
	name: string | null;
	qtyonhand: number | null;
	productprice: number | null;
	pricePo: number | null;
	taxRate: number | null;
	mpn?: string | null;
	pricelist?: number | null;
	priceRecommended?: number | null;
};

function findPropertyValueByProperty<T>(
	data: T[] | T,
	searchProperty: keyof T,
	searchValue: number | null,
	returnProperty: keyof T
): T[typeof returnProperty] | undefined {
	const array = Array.isArray(data) ? data : [data];
	const foundObject = array.find((obj) => obj[searchProperty] === searchValue);
	return foundObject ? foundObject[returnProperty] : undefined;
}

export const load = (async ({ parent, depends, url }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	//Get searchParams
	//	const activeWarehouseId = Number(url.searchParams.get('wh'));
	const activeWarehouseId = url.searchParams.get('wh') ? Number(url.searchParams.get('wh')) : null;
	const onStock = url.searchParams.get('onStock') || 'true';
	//const activeCategoryId: number | null = url.searchParams.get('cat');
	const activeCategoryId = url.searchParams.get('cat') ? Number(url.searchParams.get('cat')) : null;
	activeWarehouseId;
	const view: string | null = url.searchParams.get('vw');

	//change filter depending of activeCategoryId
	const filter = {
		column: 'm_product_category_id',
		operator: activeCategoryId ? 'eq' : 'is',
		value: activeCategoryId || null
	};
	const { data } = await supabase
		.from('m_product')
		.select(
			'id,barcode,mpn,sku,name,c_taxcategory_id,c_uom_id,m_storageonhand(warehouse_id,qtyonhand),m_productprice(m_pricelist_version_id,pricestd),m_product_po(pricelist),c_taxcategory(c_tax(rate))'
		)
		.order('name', { ascending: true })
		.eq('producttype', 'I')
		.filter(filter.column, filter.operator, filter.value);

	const products: Product[] = [];
	data?.forEach((product) => {
		const taxRate = product.c_taxcategory_id === 2 ? 0.1 : 0.2;

		// Find qtyonhand for product for selected warehouse
		const qtyonhand = product.m_storageonhand
			? findPropertyValueByProperty(
					product.m_storageonhand,
					'warehouse_id',
					activeWarehouseId,
					'qtyonhand'
			  ) ?? 0
			: 0;

		if (onStock === 'true' && !(qtyonhand > 0)) {
			return;
		}

		// Find pricestd for product in pricelist "13"
		const productprice = product.m_productprice
			? findPropertyValueByProperty(
					product.m_productprice,
					'm_pricelist_version_id',
					13,
					'pricestd'
			  ) ?? 0
			: 0;

		// Find pricestd for product in pricelist "5" and add taxRate
		const pricePo = product.m_productprice
			? (findPropertyValueByProperty(
					product.m_productprice,
					'm_pricelist_version_id',
					5,
					'pricestd'
			  ) ?? 0) *
			  (1 + taxRate)
			: 0;

		let pricelist = 0;
		if (product.m_product_po && Array.isArray(product.m_product_po)) {
			product.m_product_po?.forEach((m_product_po) => {
				if (m_product_po.pricelist && m_product_po.pricelist > 0) {
					pricelist = m_product_po.pricelist;
				}
			});
		}

		let priceRecommended = 0;
		if (pricelist === 0) {
			priceRecommended = pricePo * 1.3;
		} else if (pricelist < pricePo) {
			priceRecommended = pricePo;
		} else if (pricelist < pricePo * 1.3) {
			priceRecommended = pricelist;
		} else {
			priceRecommended = pricePo * 1.3;
		}

		priceRecommended = Math.ceil(priceRecommended);
		if (priceRecommended < 2000) {
			priceRecommended = priceRecommended - 0.01;
		}

		products.push({
			id: product.id,
			barcode: product.barcode,
			sku: product.sku,
			name: product.name,
			qtyonhand: qtyonhand,
			productprice: productprice,
			pricePo: pricePo,
			pricelist: pricelist,
			priceRecommended: priceRecommended,
			mpn: product.mpn,
			taxRate: taxRate
		});
	});
	depends('catalog:products');
	return { products };
}) satisfies PageLoad;
