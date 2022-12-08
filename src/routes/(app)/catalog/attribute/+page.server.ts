import type { PageServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { attribute } from '$lib/api/attribute';
import type { Actions } from './$types';
import { invalid, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const load: PageServerLoad = async (event) => {
	const { session } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	return {
		rows: attribute.getAll()
	};
};

export const actions: Actions = {
	create: async (event) => {
		//async default(event): Promise<
		//	| ValidationError<{
		//			error: string;
		//			values?: {
		//				code?: string | null;
		//				name?: string | null;
		//				message?: string | null;
		//			};
		//	  }>
		//	| { message: string }
		//> {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();

		//const isactive = formData.get('isactive') as boolean;
		const code = formData.get('code') as string;
		const name = formData.get('name') as string;

		const { data, error } = await supabaseClient
			.from('eav_attribute')
			.insert({ code, name })
			.select('id')
			.single();

		if (error) {
			console.log('Error', error);
			if (error instanceof AuthApiError && error.status === 400) {
				return invalid(400, {
					error: 'Invalid credentials.',
					values: {
						code
					}
				});
			}

			return invalid(500, {
				error: 'Server error. Try again later.',
				values: {
					message: error.message
				}
			});
		}

		throw redirect(303, `/catalog/attribute/${data.id}`);
	}
};
