import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const getUser = async () => {
		const { data } = await supabase.from('ad_user').select().eq('id', session.user.id).single();

		return data;
	};

	const getImages = async () => {
		let imageURLs: string[] = [];
		const { data: userImage } = await supabase
			.from('ad_user')
			.select('avatar_url')
			.eq('id', session.user.id)
			.single();

		// Generate public image URLs from the Supabase bucket
		const imageNames = userImage?.avatar_url?.split(';');
		if (imageNames) {
			imageURLs = imageNames.map(
				(imageName) => supabase.storage.from('avatars').getPublicUrl(imageName).data.publicUrl
			);
		}
		return { imageURLs };
	};
	return { session, user: getUser, images: getImages() };
}) satisfies PageLoad;
