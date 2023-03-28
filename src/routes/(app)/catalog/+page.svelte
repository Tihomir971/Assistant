<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import DataTable from '$lib/components/DataTable.svelte';
	import { activeId } from '$lib/stores/categoryStore';
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
			{ key: 'm_storageonhand[0].qtyonhand', value: 'Qty.' },
			{
				key: 'm_product_po[0].pricelist',
				value: 'Market Price'
			},
			{
				key: 'm_productprice[0].pricestd',
				value: 'Retail Price'
			}
		]}
		rows={products}
		on:edit={callbackFunction}
	/>
{/if}
