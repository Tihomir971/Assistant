import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import { invalid, redirect, type ValidationError } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	async default(event): Promise<
		| ValidationError<{
				error: string;
				values?: {
					code?: string | null;
					name?: string | null;
					message?: string | null;
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

		const { data, error } = await supabaseClient
			.from('eav_attribute')
			.insert({ code, name })
			.select('id,code,name');

		console.log('Data', data);
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

		//		throw redirect(303, `/catalog/attribute/${data.id}`);
		return {
			message: 'Please check your email for a magic link to log into the website.'
		};
	}
};
