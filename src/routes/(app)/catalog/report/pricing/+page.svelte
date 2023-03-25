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
			{ key: 'name', value: 'Name' }
		]}
		rows={products}
	/>
{/if}
