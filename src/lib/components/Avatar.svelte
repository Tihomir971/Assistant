<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { FileUploaderButton, ImageLoader } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	export let size = 10;
	export let url: string | null;
	export let supabase: SupabaseClient;

	let avatar_url: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		console.log('path', path);
		try {
			const { data, error } = await supabase.storage.from('users').download(path);
			console.log('data', data);
			console.log('error', error);
			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatar_url = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const fileBody = files[0];
			const fileExt = fileBody.name.split('.').pop();
			url = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from('users').upload(url, fileBody);

			if (error) {
				throw error;
			}

			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div style="width: {size}em;">
	<ImageLoader fadeIn ratio="1x1" src={avatar_url === null ? undefined : avatar_url} />
</div>
<FileUploaderButton labelText="Add files" />q
<div>
	<input type="hidden" name="avatarUrl" value={url} />

	<div style="width: {size}em;">
		<label class="button primary block" for="single">
			{uploading ? 'Uploading ...' : 'Upload'}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>
