import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import { invalid, type ValidationError } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	async default(event): Promise<
		| ValidationError<{
				error: string;
				values?: {
					code: string;
					name: string;
					backend_type: string;
					frontend_input: string;
					entity_type_id: number;
				};
		  }>
		| { message: string }
	> {
		const { request, url } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();

		//const isactive = formData.get('isactive') as boolean;
		const code = formData.get('code') as string | null;
		const name = formData.get('name') as string;
		const backend_type = formData.get('backend_type') as string;
		const frontend_input = formData.get('frontend_input') as string;
		const entity_type_id = formData.get('entity_type_id') as number;

		const { error } = await supabaseClient
			.from('eav_attribute')
			.insert({ id: null, code, name, backend_type, frontend_input, entity_type_id });

		if (error) {
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
					code
				}
			});
		}

		return {
			message: 'Please check your email for a magic link to log into the website.'
		};
	}
};
