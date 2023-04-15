<script lang="ts">
	import { PUBLIC_BEARER_TOKEN } from '$env/static/public';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import DataTable from '$lib/components/DataTable.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	$: ({ products, supabase, user } = data);

	//const { products, currentDate } = data;
	function rerunLoadFunction() {
		invalidate('catalog:products');
		return;
	}
	function callbackFunction(event: CustomEvent) {
		goto(`/catalog/product/${event.detail}`);
	}
	async function updateEvent() {
		const activeCategoryId = $page.url.searchParams.get('cat');
		const { data } = await supabase
			.from('m_product_category')
			.select('name')
			.eq('id', Number(activeCategoryId))
			.maybeSingle();
		const activeCategoryName = data?.name ? data.name : null;
		if (typeof activeCategoryId === 'string') {
			let headersList = {
				Authorization: 'Bearer ' + PUBLIC_BEARER_TOKEN
			};

			let bodyContent = new FormData();
			bodyContent.append('categ', activeCategoryId);

			await supabase
				.from('ad_note')
				.insert([
					{ textMsg: `Start: market research for ${activeCategoryName}`, ad_user_id: user.id }
				]);

			let response = await fetch('http://192.168.1.10:4443/cenoteka', {
				method: 'POST',
				body: bodyContent,
				headers: headersList
			});

			let data = await response.text();
			if (data) {
				await supabase
					.from('ad_note')
					.insert([
						{ textMsg: `End: market research for ${activeCategoryName}`, ad_user_id: user.id }
					]);
			}
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
