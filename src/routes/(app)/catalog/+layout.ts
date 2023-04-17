import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, depends, url }) => {
	//	const start = Date.now();
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const activeWarehouseId = Number(url.searchParams.get('wh'));
	if (activeWarehouseId === 0) {
		const newUrl = new URL(url);
		newUrl.searchParams.set('wh', '5');
		throw redirect(302, newUrl.href);
	}

	const { data: categories } = await supabase
		.from('m_product_category')
		.select('id,parent_id,text: name')
		.order('name');

	depends('catalog:categories');

	return { categories, user: session.user };
}) satisfies LayoutLoad;
