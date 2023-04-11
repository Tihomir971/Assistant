import type { Actions } from '@sveltejs/kit';

export const actions = {
	update: async ({ request }) => {
		console.log('In acction');
		const formData = await request.formData();
		const id = String(formData.get('id'));

		// TODO log the user in
		console.log(id);
	}
	//	delete: async (event) => {
	//		// TODO log the user in
	//	}
} satisfies Actions;
