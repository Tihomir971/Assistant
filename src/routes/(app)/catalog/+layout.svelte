<script lang="ts">
	import { invalidate } from '$app/navigation';
	import TreeView from '$lib/components/TreeView.svelte';
	import { activeId } from '$lib/stores/categoryStore';
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { categories } = data;

	let openCreateCategory: boolean = false;

	//	$: if ($activeId != 0) {
	//		invalidate('stocks:actively-trading');
	//		console.log('layout');
	//	}
</script>

<Grid fullWidth style="height: 100%; width;: 100%; padding: 0px">
	<Row style="margin: 0rem; height: 100%; width: 100%">
		<Column
			noGutter
			style="height: 100%; border-color: #c6c6c6; border-right-width: 2px; border-right-style: solid"
			lg={3}
		>
			{#if categories}
				<TreeView {categories} bind:openCreateCategory />
			{/if}
		</Column>
		<Column noGutter style="height: 100%; width;: 100%">
			<slot />
		</Column>
	</Row>
</Grid>
