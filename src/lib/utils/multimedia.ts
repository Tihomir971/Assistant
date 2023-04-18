import type { SupabaseClient } from '@supabase/supabase-js';

export let supabase: SupabaseClient;

const downloadImage = async (path: string, supabase: SupabaseClient) => {
	try {
		const { data, error } = await supabase.storage.from('products').download(path);
		if (error) {
			throw error;
		}

		const url = URL.createObjectURL(data);
		return url;
		//console.log(url, typeof url);
		//			avatar_url.push(url);
		//			console.log('avatar_url in downloadImage', avatar_url, avatar_url.length);
	} catch (error) {
		if (error instanceof Error) {
			console.log('Error downloading image: ', error.message);
		}
	}
};
export { downloadImage };
