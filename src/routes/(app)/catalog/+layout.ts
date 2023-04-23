import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, depends, url }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const wh = url.searchParams.get('wh');
	const vw = url.searchParams.get('vw');

	if (!wh || !vw) {
		const newUrl = new URL(url);

		if (!wh) {
			newUrl.searchParams.set('wh', '5');
		}

		if (!vw) {
			newUrl.searchParams.set('vw', 'stock');
		}

		throw redirect(302, newUrl.href);
	}

	const { data: categories } = await supabase
		.from('m_product_category')
		.select('id,parent_id,text: name')
		.order('name');

	depends('catalog:categories');

	return { categories, user: session.user };
}) satisfies LayoutLoad;
