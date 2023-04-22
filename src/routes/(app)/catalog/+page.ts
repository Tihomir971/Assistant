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
	searchValue: number,
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
	const activeWarehouseId = Number(url.searchParams.get('wh'));
	const onStock = url.searchParams.get('onStock') || 'true';
	const activeCategoryId: number | null = url.searchParams.get('cat')
		? Number(url.searchParams.get('cat'))
		: null;

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
		let pricePo = 0;
		let taxRate = 0;
		if (product.c_taxcategory_id === 2) {
			taxRate = 0.1;
		} else {
			taxRate = 0.2;
		}

		// Find qtyonhand for product for selected warehouse
		let qtyonhand = 0;
		if (Array.isArray(product.m_storageonhand)) {
			// If warehouseData is an array, find the object with the matching warehouse_id and get its qtyonhand
			const warehouse = product.m_storageonhand.find(
				(data) => data.warehouse_id === activeWarehouseId
			);
			qtyonhand = warehouse?.qtyonhand ?? 0;
		} else {
			// If warehouseData is not an array, check if it has the matching warehouse_id and get its qtyonhand
			if (product?.m_storageonhand?.warehouse_id === activeWarehouseId) {
				qtyonhand = product.m_storageonhand.qtyonhand;
			}
		}
		if (onStock === 'true' && !(qtyonhand > 0)) {
			return;
		}

		// Find pricestd for product in pricelist "13"
		let productprice = 0;
		if (Array.isArray(product.m_productprice)) {
			// If warehouseData is an array, find the object with the matching warehouse_id and get its qtyonhand
			const m_productprice = product.m_productprice.find(
				(data) => data.m_pricelist_version_id === 13
			);
			productprice = m_productprice?.pricestd ?? 0;
		} else {
			// If warehouseData is not an array, check if it has the matching warehouse_id and get its qtyonhand
			if (product?.m_productprice?.m_pricelist_version_id === 13) {
				productprice = product.m_productprice.pricestd;
			}
		}

		// Find pricestd for product in pricelist "5" and add taxRate
		pricePo = product.m_productprice
			? (findPropertyValueByProperty(
					product.m_productprice,
					'm_pricelist_version_id',
					5,
					'pricestd'
			  ) ?? 0) *
			  (1 + taxRate)
			: 0;

		/* 		if (product.m_productprice) {
			const result =
				findPropertyValueByProperty(
					product.m_productprice,
					'm_pricelist_version_id',
					5,
					'pricestd'
				) ?? 0;
			pricePo = result * (1 + taxRate);
		} */

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
	return { products };
}) satisfies PageLoad;
