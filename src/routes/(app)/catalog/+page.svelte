<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import DataTable from '$lib/components/DataTable.svelte';
	import { activeId } from '$lib/stores/categoryStore';
	import { warehouseId } from '$lib/stores/settingStore';
	import { Button, Modal } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ products } = data);

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
				key: 'productprice',
				value: 'Retail Pr.'
			}
		]}
		rows={products}
		on:edit={callbackFunction}
	/>
{/if}
