<script lang="ts">
	import { PUBLIC_BEARER_TOKEN } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import TableSkeleton from '$lib/components/TableSkeleton.svelte';
	import TableToolbarCatalog from '$lib/components/TableToolbarCatalog.svelte';
	import { updateSearchParams } from '$lib/utils/searchParams';
	import type { PageData } from './$types';
	import { addToast } from '$lib/store/toasts';

	export let data: PageData;
	$: ({ products, supabase, user } = data);
	let onStock = true;

	function editProduct(event: CustomEvent) {
		const searchParams = $page.url.searchParams.toString();
		goto(`/catalog/product/${event.detail}?${searchParams}`);
	}

	async function callExternalApi() {
		const activeCategoryId = $page.url.searchParams.get('cat');
		const title = 'Market research';

		const { data: activeCategory } = await supabase
			.from('m_product_category')
			.select('name')
			.eq('id', Number(activeCategoryId))
			.maybeSingle();

		// Send notifcation
		addToast(title, `Start: ${activeCategory?.name}`, 'brand', 10);
		await supabase
			.from('ad_note')
			.insert([{ textMsg: `Start: ${activeCategory?.name}`, ad_user_id: user.id }]);

		//Prepare fetch property
		const apiUrl = 'http://192.168.1.10:4443/cenoteka';
		const myHeaders = new Headers({ Authorization: 'Bearer ' + PUBLIC_BEARER_TOKEN });
		const formData = new FormData();
		formData.append('categ', activeCategoryId ?? '');

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				body: formData,
				headers: myHeaders
			});
			if (!response.ok) {
				throw new Error(`Network response was not OK: ${response.statusText}`);
			}

			const data = await response.text();

			// Send notifcation
			addToast(title, `Finish: ${activeCategory?.name}`, 'success');
			await supabase
				.from('ad_note')
				.insert([{ textMsg: `Finish: ${activeCategory?.name}`, ad_user_id: user.id }]);

			return;
		} catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				console.error('Failed to fetch:', error.message);
			} else {
				console.error('There has been a problem with your fetch operation:', error);
			}
		}
	}
	async function marketResearch() {
		const activeCategoryId = $page.url.searchParams.get('cat');
		const { data: activeCategory } = await supabase
			.from('m_product_category')
			.select('name')
			.eq('id', Number(activeCategoryId))
			.maybeSingle();
		if (data) {
			//const activeCategoryName = data?.name ?? null;
			if (activeCategoryId) {
				let headersList = {
					Authorization: 'Bearer ' + PUBLIC_BEARER_TOKEN
				};

				let bodyContent = new FormData();
				bodyContent.append('categ', activeCategoryId);

				try {
					const response = await fetch('http://192.168.1.10:4443/cenoteka', {
						method: 'POST',
						body: bodyContent,
						headers: headersList
					});
					if (response.ok) {
						addToast('Market research', `Finish researching: ${activeCategory?.name}`, 'success');
						await supabase
							.from('ad_note')
							.insert([
								{ textMsg: `Finish researching: ${activeCategory?.name}`, ad_user_id: user.id }
							]);

						return true;
					} else {
						addToast(
							'Market research',
							`API endpoint not active. -  Status: ${response.status}`,
							'error'
						);
						console.error(
							`API endpoint not active: 'http://192.168.1.10:4443/cenoteka' - Status: ${response.status}`
						);
						return false;
					}
				} catch (error) {
					console.error(`Error checking API endpoint: 'http://192.168.1.10:4443/cenoteka'`, error);
				}
			}
		}
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
				key: 'pricePurchase',
				value: 'Purchase'
			},
			{
				key: 'priceMarket',
				value: 'Market Pr.'
			},
			{
				key: 'priceRetail',
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
			on:research={callExternalApi}
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
