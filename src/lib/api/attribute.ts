import { supabaseClient } from '$lib/db';
import { error } from '@sveltejs/kit';

export const attribute = {
	getAll: async () => {
		const { data } = await supabaseClient
			.from('eav_attribute')
			.select('id, isactive, code, name, backend_type, frontend_input, entity_type_id');
		console.log(data);
		return data;
	},
	getById: async (id: number) => {
		const { data, error: err } = await supabaseClient
			.from('eav_attribute')
			.select('id, isactive, code, name, backend_type, frontend_input, entity_type_id')
			.match({ id })
			.maybeSingle();

		if (err) {
			throw error(404);
		}
		return data;
	},
	getAttributeOptions: async (id: number) => {
		const { data } = await supabaseClient
			.from('eav_attribute_option')
			.select()
			.eq('eav_attribute_id', id);
		return data;
	}
};
