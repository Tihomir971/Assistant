<script lang="ts">
	export let slideNo: number;
	export let totalSlides: number;
	export let slideImageURL: string;
	export let altTag: string = 'altTag';
	export let attr: string = 'attr';
</script>

<!-- Full-width images with number text -->
<div class="mySlides">
	<div class="numbertext">{slideNo} / {totalSlides}</div>
	<img src={slideImageURL} alt={altTag} title={attr} />
</div>

<style>
	/* Number text (1/3 etc) */
	.numbertext {
		color: #f2f2f2;
		font-size: 0.9rem;
		padding: 8px 12px;
		text-shadow: 1px 1px black;
		position: absolute;
		top: 0;
	}

	img {
		max-width: 100%;
		max-height: 100%;
	}
	.mySlides {
		width: 100%;
		height: 100%;
	}
</style>
