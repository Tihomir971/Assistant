import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { supabase, session } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const { data: attributeset } = await supabase.from('m_attributeset').select('*');

	return { attributeset };
}) satisfies PageLoad;
