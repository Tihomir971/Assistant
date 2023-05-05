<script lang="ts">
	import { PaginationNav } from 'carbon-components-svelte';
	import Slide from './Slide.svelte';
	import Caption from './Caption.svelte';

	export let images: { imageURLs: string[] };
	let page = 1;
	let total = 0;
	$: total = images.imageURLs.length;
	let currentImageIndex = 0;
	$: image = images.imageURLs[imageShowingIndex];

	/* IMAGE TO SHOW */
	let imageShowingIndex = 0;
	const nextSlide = () => {
		if (imageShowingIndex === images.imageURLs.length - 1) {
			imageShowingIndex = 0;
		} else {
			imageShowingIndex += 1;
		}
	};

	const prevSlide = () => {
		if (imageShowingIndex === 0) {
			imageShowingIndex = images.imageURLs.length - 1;
		} else {
			imageShowingIndex -= 1;
		}
	};

	//	const goToSlide = (number) => imageShowingIndex = number;
</script>

{#if total > 0}
	<div class="main">
		<div class="container">
			<Slide
				slideNo={page}
				totalSlides={total}
				slideImageURL={images.imageURLs[currentImageIndex]}
			/>

			<!-- Image text -->
			<!-- <Caption caption={images[imageShowingIndex].name} -->
			<Caption caption="Name" on:prevClick={prevSlide} on:nextClick={nextSlide} />
			<PaginationNav
				bind:page
				bind:total
				on:change={() => {
					currentImageIndex = page - 1;
				}}
			/>
		</div>
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&display=swap');

	* {
		box-sizing: border-box;
		font-family: 'Josefin Sans', sans-serif;
	}

	.main {
		width: 100%;
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
