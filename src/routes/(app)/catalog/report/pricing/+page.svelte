<script lang="ts">
	import DataTable from '$lib/components/DataTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ products } = data);
</script>

{#if products}
	<!-- content here -->
	<DataTable
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
	/>
{/if}
