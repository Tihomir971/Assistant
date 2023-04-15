import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			// the user is not signed in
			throw fail(401, { message: 'Unauthorized' });
		}

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const supervisor_id = formData.get('supervisor_id') as string;
		const avatar_url = formData.get('avatar_url') as string;

		const { error } = await supabase.from('users').upsert({
			id: session?.user.id,
			name: name,
			supervisor_id,
			avatar_url
		});
		if (error)
			return {
				message: 'Please check your email for a magic link to log into the website.'
			};
	}
} satisfies Actions;
