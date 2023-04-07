<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import CategoryTree from '$lib/components/CategoryTree.svelte';
	import { activeId } from '$lib/stores/categoryStore';
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: ({ categories, supabase } = data);

	function callbackFunction(event: CustomEvent) {
		console.log(`Notify fired! Detail: ${event.detail}`);
		goto(`/catalog/category/${event.detail}`);
	}
</script>

<Grid fullWidth style="height: 100%; width;: 100%; padding: 0px">
	<Row style="margin: 0rem; height: 100%; width: 100%">
		<Column
			noGutter
			style="height: 100%; border-color: #c6c6c6; border-right-width: 2px; border-right-style: solid"
			lg={3}
		>
			{#if categories}
				<CategoryTree {categories} {supabase} on:edit={callbackFunction} />
			{/if}
		</Column>
		<Column noGutter style="height: 100%; width;: 100%">
			<slot />
		</Column>
	</Row>
</Grid>
