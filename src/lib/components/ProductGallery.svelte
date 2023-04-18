<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import {
		AspectRatio,
		Column,
		FileUploaderButton,
		ImageLoader,
		PaginationNav
	} from 'carbon-components-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Slide from './SlideshowGallery/Slide.svelte';

	export let size = 100;
	export let url: string[] | undefined;
	export let supabase: SupabaseClient;

	let avatar_url: string[] = [];
	let page = 1;
	let src: string | undefined = undefined;
	let imageLoader: any;
	let total = 0;
	let currentImageIndex = 0;
	$: console.log('currentImageIndex', currentImageIndex);

	let uploading = false;
	let files: FileList;
	let key: number;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
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

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const fileBody = files[0];
			const fileExt = fileBody.name.split('.').pop();
			//			url = `${Math.random()}.${fileExt}`;

			//			let { error } = await supabase.storage.from('products').upload(url, fileBody);

			//			if (error) {
			//				throw error;
			//			}

			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};
	onMount(() => {
		url?.forEach((element) => {
			downloadImage(element).then((image) => {
				if (image !== undefined) avatar_url.push(image);
				total = avatar_url.length;
			});
		});
		//src = avatar_url[0];
	});
</script>

{#if total > 0}
	<AspectRatio ratio="1x1">
		<img src={avatar_url[currentImageIndex]} height="100%" width="100%" alt="Hello" />
		<PaginationNav
			bind:page
			bind:total
			on:change={() => {
				currentImageIndex = page - 1;
			}}
		/>
		<FileUploaderButton labelText="Add files" />
	</AspectRatio>
	<!-- <ImageLoader bind:src={avatar_url[currentImageIndex]} alt="Hello" /> -->
{/if}

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
