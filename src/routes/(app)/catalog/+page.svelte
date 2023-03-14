<script lang="ts">
	import TreeView from '$lib/components/TreeView.svelte';
	import { Column, DataTable, Grid, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ categoryTable, productData, user } = data);
</script>

<Grid fullWidth noGutter>
	<Row>
		<Column lg={3}>
			{#if categoryTable}
				<!-- <TreeView {children} {categoryTable} /> -->
				<TreeView {categoryTable} />
			{/if}
		</Column>
		<Column>
			{#if productData}
				<DataTable
					headers={[
						{ key: 'barcode', value: 'barcode' },
						{ key: 'sku', value: 'sku' },
						{ key: 'name', value: 'Name' }
					]}
					rows={productData}
				/>
			{/if}
		</Column>
	</Row>
</Grid>
