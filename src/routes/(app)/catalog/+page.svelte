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
			.select('id,barcode,sku,name,m_storageonhand(qtyonhand),m_productprice(pricestd)')
			.order('name')
			.eq('m_product_category_id', activeId)
			.eq('m_storageonhand.warehouse_id', 5)
			.eq('m_productprice.m_pricelist_version_id', 13);
		console.log('data', data);
		if (data) {
			productData = data;
		}
	}

	$: if (data.session && activeId) {
		loadData();
	}
</script>

<Grid fullWidth style="height: 100%">
	<Row style="margin-left: 0rem; height: 100%">
		<Column
			noGutter
			style="height: 100%; border-color: #c6c6c6; border-right-width: 2px; border-right-style: solid"
			lg={3}
		>
			{#if categoryTable}
				<TreeView {categoryTable} bind:activeId />
			{/if}
		</Column>
		<Column noGutter style="height: 100%">
			{#if productData}
				<DataTable
					size="short"
					headers={[
						{ key: 'sku', value: 'SKU' },
						{ key: 'barcode', value: 'Barcode' },
						{ key: 'name', value: 'Name' },
						{ key: 'm_storageonhand[0].qtyonhand', value: 'Qty.' },
						{
							key: 'm_productprice[0].pricestd',
							value: 'Price.',
							display: (pricestd) =>
								new Intl.NumberFormat('sr-Latn-RS', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}).format(pricestd)
						}
					]}
					rows={productData}
					{session}
				/>
			{/if}
		</Column>
	</Row>
</Grid>
