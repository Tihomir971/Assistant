import type { SupabaseClient } from '@supabase/supabase-js';

export let supabase: SupabaseClient;

const downloadImage = async (path: string, bucket: string, supabase: SupabaseClient) => {
	try {
		const { data, error } = await supabase.storage.from(bucket).download(path);
		if (error) {
			throw error;
		}
		const url = URL.createObjectURL(data);

		return url;
	} catch (error) {
		if (error instanceof Error) {
			console.log('Error downloading image: ', error.message);
		}
	}
};
export { downloadImage };
