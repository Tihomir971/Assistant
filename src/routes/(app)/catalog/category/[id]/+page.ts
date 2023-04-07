import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent, url }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	console.log('url', url.searchParams);
	console.log('params', params);
	const id = Number(params.id);
	const { data: category } = await supabase
		.from('m_product_category')
		.select()
		.eq('id', id)
		.maybeSingle();
	return { category };
}) satisfies PageLoad;

/* export const actions = {
	update: async (event) => {
		// TODO log the user in
	},
	delete: async (event) => {
		// TODO log the user in
	}
} satisfies Actions; */
