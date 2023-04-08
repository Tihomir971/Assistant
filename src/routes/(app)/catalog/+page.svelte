<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import DataTable from '$lib/components/DataTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ products } = data);

	function rerunLoadFunction() {
		invalidate('catalog:products');
		return;
	}
	function callbackFunction(event: CustomEvent) {
		console.log(`Notify fired! Detail: ${event.detail}`);

		console.log(`/catalog/product/${event.detail}`);
		const searchParams = $page.url.searchParams.toString();
		console.log(searchParams);
		goto(`/catalog/product/${event.detail}?${searchParams}`);
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
