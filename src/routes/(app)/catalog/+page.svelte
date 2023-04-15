<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import DataTable from '$lib/components/DataTable.svelte';
	import TableSkeleton from '$lib/components/TableSkeleton.svelte';
	import TableToolbarCatalog from '$lib/components/TableToolbarCatalog.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ products } = data);

	function rerunLoadFunction() {
		invalidate('catalog:products');
		return;
	}
	function callbackFunction(event: CustomEvent) {
		const searchParams = $page.url.searchParams.toString();
		goto(`/catalog/product/${event.detail}?${searchParams}`);
	}
	let onStock = true;
</script>

{#if products}
	<TableSkeleton
		size="short"
		batchSelection
		headers={[
			{ key: 'sku', value: 'SKU' },
			{ key: 'barcode', value: 'Barcode' },
			{ key: 'mpn', value: 'MPN' },
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
	>
		<TableToolbarCatalog
			{onStock}
			on:filterStock={() => {
				onStock = !onStock;
				const newUrl = new URL($page.url);
				newUrl?.searchParams?.set('onStock', onStock.toString());
				goto(newUrl);
			}}
		/>
	</TableSkeleton>
{/if}
