<script lang="ts">
	import TreeView from '$lib/components/TreeView.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import type { TreeNodeId } from 'carbon-components-svelte/types/TreeView/TreeView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ categoryTable, user, supabase, session } = data);

	let activeId: TreeNodeId;
	let productData: ReadonlyArray<DataTableRow> = [];

	async function loadData() {
		const { data } = await supabase
			.from('m_product')
			.select('id,barcode,sku,name,m_storageonhand(qtyonhand)')
			.order('name')
			.eq('m_product_category_id', activeId)
			.eq('m_storageonhand.warehouse_id', 5);
		console.log('data', data);
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
		<Column noGutterLeft lg={3}>
			{#if categoryTable}
				<TreeView {categoryTable} bind:activeId />
			{/if}
		</Column>
		<Column noGutter style="padding: 0px; max-height: calc(100vh - 3rem - 3rem - 3rem)">
			{#if productData}
				<DataTable
					style="overflow: auto; height: calc(100vh - 3rem -2rem);padding-top: 0px;"
					size="short"
					headers={[
						{ key: 'sku', value: 'SKU' },
						{ key: 'barcode', value: 'Barcode' },
						{ key: 'name', value: 'Name' },
						{ key: 'm_storageonhand[0].qtyonhand', value: 'Qty.' }
					]}
					rows={productData}
					{session}
				/>
			{/if}
		</Column>
	</Row>
</Grid>
