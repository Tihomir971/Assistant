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
	async function updateEvent() {
		console.log('Notify fired! Update');
		let headersList = {
			Accept: '*/*',
			'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
			Authorization: 'Bearer 2be6a370df8fee54201fd6d53d7726240de5a2756493abd19877956ec0716855'
		};

		let bodyContent = new FormData();
		bodyContent.append('categ', '29');

		let response = await fetch('http://192.168.1.10:4443/cenoteka', {
			method: 'POST',
			body: bodyContent,
			headers: headersList
		});

		let data = await response.text();
		console.log('response', data);
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
		on:update={updateEvent}
	/>
{/if}
