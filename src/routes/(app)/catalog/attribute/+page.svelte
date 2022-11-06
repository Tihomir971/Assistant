<script lang="ts">
	import { Grid } from 'carbon-components-svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

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

	function handleMessage(event: CustomEvent<{ command: string; id?: number }>) {
		if (event.detail.command === 'add') {
			console.log(`Notify fired! Create: ${event.detail.command}, 'with', ${event.detail.id}`);
			goto('/catalog/attribute/new');
		} else if (event.detail.command === 'edit') {
			console.log(`Notify fired! Edit: ${event.detail.command}, 'with', ${event.detail.id}`);
		} else if (event.detail.command === 'refresh') {
			console.log(`Notify fired! Refresh: ${event.detail.command}, 'with', ${event.detail.id}`);
		} else {
			console.log(`Notify fired! Delete: ${event.detail.command}, 'with', ${event.detail.id}`);
		}
	}
</script>

<Grid>
	{#if rows != null}
		<DataTable title="Atributes" {headers} {rows} on:message={handleMessage} />
	{/if}
</Grid>
