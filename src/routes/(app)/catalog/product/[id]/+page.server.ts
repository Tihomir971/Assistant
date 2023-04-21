import { error, type Actions, fail } from '@sveltejs/kit';

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		console.log('update');
		const start = Date.now();

		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const name = String(formData.get('name'));
		const sku = String(formData.get('sku'));
		const barcode = String(formData.get('barcode'));
		const m_product_category_id = formData.get('m_product_category_id')
			? Number(formData.get('m_product_category_id'))
			: null;
		const m_attributeset_id = formData.get('m_attributeset_id')
			? Number(formData.get('m_attributeset_id'))
			: null;
		const condition = String(formData.get('condition'));
		const unitsperpack = Number(formData.get('unitsperpack'));
		const unitsperpallet = Number(formData.get('unitsperpack'));
		const isselfservice = formData.get('isselfservice') === 'true' ? true : false;
		const isactive = formData.get('isactive') === 'true' ? true : false;
		const discontinued = formData.get('discontinued') === 'true' ? true : false;

		console.log(
			'formdata',
			id,
			name,
			sku,
			barcode,
			m_product_category_id,
			m_attributeset_id,
			condition,
			unitsperpack,
			unitsperpallet,
			isselfservice,
			isactive,
			discontinued
		);

		const { error: createProductError } = await supabase
			.from('m_product')
			.update({
				name,
				sku,
				barcode,
				m_product_category_id,
				m_attributeset_id,
				condition,
				unitsperpack,
				unitsperpallet,
				isselfservice,
				isactive,
				discontinued
			})
			.eq('id', id);

		if (createProductError) {
			return fail(500, {
				supabaseErrorMessage: createProductError.message
			});
		}

		console.log('Total time taken : ', Date.now() - start + ' ms');

		return {};
	}
} satisfies Actions;
