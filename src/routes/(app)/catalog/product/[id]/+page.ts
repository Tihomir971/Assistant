import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const id = Number(params.id);
	const { data: product } = await supabase
		.from('m_product')
		.select('id,barcode,name,condition,m_product_category_id')
		.eq('id', id)
		.maybeSingle();

	return { product };
}) satisfies PageLoad;
