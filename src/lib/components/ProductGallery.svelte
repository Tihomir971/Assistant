<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { AspectRatio, FileUploaderButton, PaginationNav } from 'carbon-components-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Slide from './SlideshowGallery/Slide.svelte';
	import { downloadImage } from '$lib/utils/multimedia';

	export let size = 100;
	export let url: string[] | undefined;
	export let supabase: SupabaseClient;
	export let bucket: string;
	let avatar_url: string[] = [];
	let page = 1;
	let total = 0;
	let currentImageIndex = 0;
	$: console.log('currentImageIndex', currentImageIndex);

	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

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
			downloadImage(element, bucket, supabase).then((image) => {
				if (image !== undefined) avatar_url.push(image);
				total = avatar_url.length;
			});
		});
		//src = avatar_url[0];
	});
</script>

{#if total > 0}
	<div class="main">
		<div class="container">
			<AspectRatio ratio="1x1">
				<Slide slideNo={page} totalSlides={total} slideImageURL={avatar_url[currentImageIndex]} />
				<!-- 	<img src={avatar_url[currentImageIndex]} height="100%" width="100%" alt="Hello" /> -->
			</AspectRatio>
			<PaginationNav
				bind:page
				bind:total
				on:change={() => {
					currentImageIndex = page - 1;
				}}
			/>
			<FileUploaderButton labelText="Add files" />
		</div>
	</div>
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

<style>
	@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&display=swap');

	* {
		box-sizing: border-box;
		font-family: 'Josefin Sans', sans-serif;
	}

	.main {
		/* 	width: 70vw; */
		display: flex;
		flex-direction: column;
		/* 	margin: 10% auto; */
		background-color: #222;
		box-shadow: 0 0 10px black;
	}

	/* Position the image container (needed to position the left and right arrows) */
	.container {
		position: relative;
	}

	/* 	.thumbnails-row {
		width: 100%;
		display: flex;
		align-self: flex-end;
	} */
</style>
