<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import DataTable from '$lib/components/DataTable.svelte';
	import { activeId } from '$lib/stores/categoryStore';
	import { warehouseId } from '$lib/stores/settingStore';
	import { Button, Modal } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ products } = data);

	//const { products, currentDate } = data;
	let openEdit = false;
	function rerunLoadFunction() {
		invalidate('catalog:products');
		return;
	}
	function callbackFunction(event: CustomEvent) {
		console.log(`Notify fired! Detail: ${event.detail}`);
		goto(`/catalog/product/${event.detail}`);
	}
</script>

{#if products}
	<DataTable
		size="short"
		headers={[
			{ key: 'sku', value: 'SKU' },
			{ key: 'barcode', value: 'Barcode' },
			{ key: 'name', value: 'Name' },
			{ key: 'qtyonhand', value: 'Qty.' },
			{
				key: 'pricePo',
				value: 'Purchase Pr.'
			},
			{
				key: 'pricelist',
				value: 'Market Pr.'
			},
			{
				key: 'productprice',
				value: 'Retail Pr.'
			},
			{
				key: 'priceRecommended',
				value: 'Recom. Pr.'
			}
		]}
		rows={products}
		on:edit={callbackFunction}
	/>
{/if}

<style>
	:global(.table-wrapper) {
		overflow-x: scroll;
	}
	:global(.table-wrapper .bx--data-table-container) {
		overflow: auto;
	}
	:global(
			.table-wrapper .bx--data-table-header,
			.table-wrapper .bx--table-toolbar,
			.table-wrapper .bx--pagination
		) {
		position: sticky;
		left: 0;
	}
</style>
