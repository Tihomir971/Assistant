<script lang="ts">
	import DataTable from '$lib/components/DataTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { pricelist } = data;
</script>

<DataTable
	headers={[
		{ key: 'id', value: 'id' },
		{ key: 'basepricelist_id', value: 'Base' },
		{ key: 'c_currency_id', value: 'currency' },
		{ key: 'created', value: 'Created' },
		{ key: 'description', value: 'description' },
		{ key: 'enforcepricelimit', value: 'pricelimit' },
		{ key: 'isactive', value: 'Rule' },
		{ key: 'updated', value: 'Updated' }
	]}
	rows={pricelist}
/>
