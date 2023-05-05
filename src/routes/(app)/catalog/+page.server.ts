import { PUBLIC_BEARER_TOKEN } from '$env/static/public';
import { addToast } from '$lib/store/toasts';
import { error, type Actions, fail } from '@sveltejs/kit';

export const actions: Actions = {
	marketResearch: async ({ url, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		const activeCategoryId = url.searchParams.get('wh');
		if (!activeCategoryId) return;

		const title = 'Market research';

		const { data: activeCategory } = await supabase
			.from('m_product_category')
			.select('name')
			.eq('id', Number(activeCategoryId))
			.maybeSingle();

		// Send notifcation
		addToast(title, `Start: ${activeCategory?.name}`, 'brand', 10);
		const { error: createPostError } = await supabase
			.from('ad_note')
			.insert([{ textMsg: `Start: ${activeCategory?.name}`, ad_user_id: session.user.id }]);
		if (createPostError) {
			return fail(500, {
				supabaseErrorMessage: createPostError.message
			});
		}

		//Prepare fetch property
		const apiUrl = 'http://192.168.1.10:4443/cenoteka';
		const myHeaders = new Headers({ Authorization: 'Bearer ' + PUBLIC_BEARER_TOKEN });
		const formData = new FormData();
		formData.append('categ', activeCategoryId ?? '');

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				body: formData,
				headers: myHeaders
			});
			if (!response.ok) {
				throw new Error(`Network response was not OK: ${response.statusText}`);
			}

			const data = await response.text();

			// Send notifcation
			addToast(title, `Finish: ${activeCategory?.name}`, 'success');
			const { error: createPostError } = await supabase
				.from('ad_note')
				.insert([{ textMsg: `Finish: ${activeCategory?.name}`, ad_user_id: session.user.id }]);
			if (createPostError) {
				return fail(500, {
					supabaseErrorMessage: createPostError.message
				});
			}

			return data;
		} catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				console.error('Failed to fetch:', error.message);
			} else {
				console.error('There has been a problem with your fetch operation:', error);
			}
		}
	}
};
