<script lang="ts">
	import { PUBLIC_BEARER_TOKEN } from '$env/static/public';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import TableSkeleton from '$lib/components/TableSkeleton.svelte';
	import TableToolbarCatalog from '$lib/components/TableToolbarCatalog.svelte';
	import { updateSearchParams } from '$lib/utils/searchParams';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ products, supabase, user } = data);
	let onStock = true;

	function editProduct(event: CustomEvent) {
		const searchParams = $page.url.searchParams.toString();
		goto(`/catalog/product/${event.detail}?${searchParams}`);
	}

	async function researchEvent() {
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

	function refreshEvent() {
		invalidate('catalog:products');
		return;
	}
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
				value: 'Purchase'
			},
			{
				key: 'pricelist',
				value: 'Market Pr.'
			},
			{
				key: 'productprice',
				value: 'Retail'
			},
			{
				key: 'priceRecommended',
				value: 'Recom. Pr.'
			}
		]}
		rows={products}
		on:edit={editProduct}
	>
		<TableToolbarCatalog
			{onStock}
			on:refresh={refreshEvent}
			on:research={researchEvent}
			on:filterStock={() => {
				onStock = !onStock;
				updateSearchParams('onStock', onStock.toString());
				//				const newUrl = new URL($page.url);
				//				newUrl?.searchParams?.set('onStock', onStock.toString());
				//				goto(newUrl);
			}}
		/>
	</TableSkeleton>
{/if}
