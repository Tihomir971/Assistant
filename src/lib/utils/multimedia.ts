import type { SupabaseClient } from '@supabase/supabase-js';

export let supabase: SupabaseClient;

const downloadImage = async (path: string, bucket: string, supabase: SupabaseClient) => {
	try {
		console.log('path', path);
		const { data, error } = await supabase.storage.from(bucket).download(path);
		console.log('error', error);
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
