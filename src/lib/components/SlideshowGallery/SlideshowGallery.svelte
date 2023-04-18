<script lang="ts">
	import { AspectRatio } from 'carbon-components-svelte';
	import Caption from './Caption.svelte';
	import Slide from './Slide.svelte';
	import { onMount } from 'svelte';
	import { downloadImage } from '$lib/utils/multimedia';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let url: string[] | undefined;
	export let supabase: SupabaseClient;

	let images: string[] = [];
	let imageShowingIndex = 0;
	$: totalSlides = images.length;
	$: image = images[imageShowingIndex];

	const nextSlide = () => {
		if (imageShowingIndex === images.length - 1) {
			imageShowingIndex = 0;
		} else {
			imageShowingIndex += 1;
		}
	};

	const prevSlide = () => {
		if (imageShowingIndex === 0) {
			imageShowingIndex = images.length - 1;
		} else {
			imageShowingIndex -= 1;
		}
	};
	onMount(() => {
		url?.forEach((element) => {
			downloadImage(element, supabase).then((image) => {
				if (image !== undefined) images.push(image);
				totalSlides = images.length;
			});
		});
	});
</script>

<AspectRatio ratio="1x1">
	<div class="main">
		{totalSlides}
		<div class="container">
			<Slide
				bind:image
				altTag="image.name"
				attr="image.attribution"
				slideNo={imageShowingIndex + 1}
				bind:totalSlides
			/>
		</div>
		<!-- Image text -->
		<Caption caption="Naziv Slike" on:prevClick={prevSlide} on:nextClick={nextSlide} />
	</div>
</AspectRatio>

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

	.thumbnails-row {
		width: 100%;
		display: flex;
		align-self: flex-end;
	}
</style>
