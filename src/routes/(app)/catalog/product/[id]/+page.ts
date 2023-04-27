import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent, depends }) => {
	console.log('product id +page.ts');

	console.log('Load function');
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const getParners = async () => {
		const { data } = await supabase.from('c_bpartner').select('id, text: name');
		return data;
	};

	const productId = Number(params.id);
	const getProduct = async (id: number) => {
		const { data } = await supabase.from('m_product').select().eq('id', id).maybeSingle();

		return data;
	};
	const getProduct_po = async (id: number) => {
		const { data } = await supabase
			.from('m_product_po')
			.select('id,c_bpartner_id,pricelist,vendorproductno,url,updated,c_bpartner(name)')
			.eq('m_product_id', id);
		return data;
	};

	const getReplenish = async (id: number) => {
		const { data } = await supabase
			.from('m_replenish')
			.select('id,m_warehouse_id,level_min,level_max,m_warehousesource_id')
			.eq('m_product_id', id);
		return data;
	};

	const getStorageonhand = async (id: number) => {
		const { data } = await supabase
			.from('m_storageonhand')
			.select('id,qtyonhand,created,updated,m_warehouse(code)')
			.eq('m_product_id', id);
		return data;
	};

	const getImages = async (id: number) => {
		const images: string[] = [];
		const { data } = await supabase
			.from('m_product')
			.select('id,sku,barcode,name,condition,m_product_category_id,imageurl')
			.eq('id', id)
			.maybeSingle();
		if (data?.imageurl) {
			const imagesurl = data?.imageurl.split(';');
			imagesurl.forEach(async (url) => {
				const { data } = await supabase.storage.from('products').download(url);
				if (data) images.push(URL.createObjectURL(data));
			});
		}
		return images;
	};

	const getAttributeSet = async () => {
		const { data } = await supabase.from('m_attributeset').select('id, text: name');

		return data;
	};

	depends('catalog:product:id');
	//	console.log('imageUrl SSR', imageUrl, typeof imageUrl);
	return {
		product: getProduct(productId),
		product_po: getProduct_po(productId),
		replenish: getReplenish(productId),
		storageonhand: getStorageonhand(productId),
		images: getImages(productId),
		attributeset: getAttributeSet(),
		partners: getParners()
	};
}) satisfies PageLoad;
