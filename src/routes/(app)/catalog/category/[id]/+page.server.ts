import { error, type Actions, fail } from '@sveltejs/kit';

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const name = String(formData.get('name'));
		const parent_id = formData.get('parent_id') === '' ? null : Number(formData.get('parent_id'));
		const description = String(formData.get('description'));
		const isselfservice = formData.get('isselfservice') === 'true' ? true : false;
		const isactive = formData.get('isactive') === 'true' ? true : false;

		const { data: newPost, error: createPostError } = await supabase
			.from('m_product_category')
			.update({ name, parent_id, description, isselfservice, isactive })
			.eq('id', id);

		if (createPostError) {
			return fail(500, {
				supabaseErrorMessage: createPostError.message
			});
		}

		return {
			newPost
		};
	}
} satisfies Actions;
