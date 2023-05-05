import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent, depends }) => {
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
		let imageURLs: string[] = [];
		const { data: product } = await supabase
			.from('m_product')
			.select('imageurl')
			.eq('id', id)
			.single();

		// Generate public image URLs from the Supabase bucket
		const imageNames = product?.imageurl?.split(';');
		if (imageNames) {
			imageURLs = imageNames.map(
				(imageName) => supabase.storage.from('products').getPublicUrl(imageName).data.publicUrl
			);
		}

		return { imageURLs };
	};

	const getAttributeSet = async () => {
		const { data } = await supabase.from('m_attributeset').select('id, text: name');

		return data;
	};

	depends('catalog:product:id');
	return {
		product: getProduct(productId),
		attributeset: getAttributeSet(),
		partners: getParners(),
		streamed: {
			images: getImages(productId),
			product_po: getProduct_po(productId),
			replenish: getReplenish(productId),
			storageonhand: getStorageonhand(productId)
		}
	};
}) satisfies PageLoad;
