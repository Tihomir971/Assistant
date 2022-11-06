<script lang="ts">
	import { Grid } from 'carbon-components-svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ rows } = data);
	let headers = [
		{ key: 'id', value: 'ID' },
		{ key: 'isactive', value: 'isactive' },
		{ key: 'code', value: 'code' },
		{ key: 'name', value: 'name' },
		{ key: 'backend_type', value: 'backend_type' },
		{ key: 'frontend_input', value: 'frontend_input' },
		{ key: 'entity_type_id', value: 'entity_type_id' }
	];
</script>

<Grid>
	{#if rows != null}
		<DataTable title="Products" {headers} {rows} />
	{/if}
</Grid>
