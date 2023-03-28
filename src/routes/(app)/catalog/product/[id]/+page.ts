import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const id = Number(params.id);
	const { data: product } = await supabase.from('m_product').select().eq('id', id).maybeSingle();
	const { data: product_po } = await supabase.from('m_product_po').select().eq('id', id);

	return { product, product_po };
}) satisfies PageLoad;
