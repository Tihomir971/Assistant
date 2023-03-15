<script lang="ts">
	import TreeView from '$lib/components/TreeView.svelte';
	import { Column, DataTable, Grid, Row } from 'carbon-components-svelte';
	import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import type { TreeNodeId } from 'carbon-components-svelte/types/TreeView/TreeView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ categoryTable, user, supabase } = data);

	let activeId: TreeNodeId;
	let productData: ReadonlyArray<DataTableRow> = [];

	async function loadData() {
		const { data } = await supabase
			.from('m_product')
			.select('id,barcode,sku,name')
			.order('name')
			.eq('m_product_category_id', activeId)
			.limit(20);
		if (data) {
			productData = data;
		}
	}

	$: if (data.session && activeId) {
		loadData();
	}
</script>

<Grid fullWidth noGutter>
	<Row>
		<Column lg={3}>
			{#if categoryTable}
				{activeId}
				<!-- <TreeView {children} {categoryTable} /> -->
				<TreeView {categoryTable} bind:activeId />
			{/if}
		</Column>
		<Column>
			{#if productData}
				<DataTable
					size="short"
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
