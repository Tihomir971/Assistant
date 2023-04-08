<script lang="ts">
	import { PUBLIC_BEARER_TOKEN } from '$env/static/public';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import DataTable from '$lib/components/DataTable.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	$: ({ products } = data);

	//const { products, currentDate } = data;
	function rerunLoadFunction() {
		invalidate('catalog:products');
		return;
	}
	function callbackFunction(event: CustomEvent) {
		console.log(`Notify fired! Detail: ${event.detail}`);
		goto(`/catalog/product/${event.detail}`);
	}
	async function updateEvent() {
		const activeCategoryId = $page.url.searchParams.get('cat');
		console.log('Update Category', activeCategoryId);
		if (typeof activeCategoryId === 'string') {
			let headersList = {
				Authorization: 'Bearer ' + PUBLIC_BEARER_TOKEN
			};

			let bodyContent = new FormData();
			bodyContent.append('categ', activeCategoryId);

			let response = await fetch('http://192.168.1.10:4443/cenoteka', {
				method: 'POST',
				body: bodyContent,
				headers: headersList
			});

			let data = await response.text();
			console.log('response', data);
		}
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
