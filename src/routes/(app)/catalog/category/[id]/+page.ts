import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const id = Number(params.id);
	const { data: category } = await supabase
		.from('m_product_category')
		.select()
		.eq('id', id)
		.maybeSingle();
	return { category };
}) satisfies PageLoad;
