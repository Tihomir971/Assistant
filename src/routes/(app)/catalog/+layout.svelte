<script lang="ts">
	import { goto } from '$app/navigation';
	import CategoryTree from '$lib/components/CategoryTree.svelte';
	import { Column, Content, Grid, Row } from 'carbon-components-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: ({ categories, supabase } = data);

	function callbackFunction(event: CustomEvent) {
		goto(`/catalog/category/${event.detail}`);
	}
</script>

<!-- <SideNav bind:isOpen={isSideNavOpen} fixed style="max-width: 18rem; width: 18rem;">
	{#if categories}
		<div>
			<CategoryTree {categories} {supabase} on:edit={callbackFunction} />
		</div>
	{/if}
</SideNav> -->
<Content style="padding: 0px; height: calc(100vh - 3rem);">
	<Grid fullWidth style="height: 100%; padding: 0px">
		<Row style="margin: 0rem; height: 100%; width: 100%">
			<Column
				noGutter
				style="height: 100%; border-color: #c6c6c6; border-right-width: 2px; border-right-style: solid;"
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
</Content>
