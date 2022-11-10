<script lang="ts">
	import { Grid } from 'carbon-components-svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { getSupabase } from '@supabase/auth-helpers-sveltekit';
	import { redirect } from '@sveltejs/kit';

	export let data: PageData;

	$: ({ rows } = data);
	//	$: ({ event } = data);
	//	$: console.log( (event,2,0));

	let headers = [
		{ key: 'id', value: 'ID' },
		{ key: 'isactive', value: 'isactive' },
		{ key: 'code', value: 'code' },
		{ key: 'name', value: 'name' },
		{ key: 'backend_type', value: 'backend_type' },
		{ key: 'frontend_input', value: 'frontend_input' },
		{ key: 'entity_type_id', value: 'entity_type_id' }
	];

	/* 	async function handleDelete(id: number | undefined) {
		const { supabaseClient } = await getSupabase(event);
		const { error } = await supabaseClient.from('eav_attribute').delete().eq('id');
		if (error) {
			console.log(error);
			return;
		}
	} */

	function handleMessage(event: CustomEvent<{ command: string; id?: number }>) {
		if (event.detail.command === 'create') {
			goto('/catalog/attribute/create');
		} else if (event.detail.command === 'edit') {
			goto(`/catalog/attribute/${event.detail.id}`);
		} else if (event.detail.command === 'delete') {
			//			handleDelete(event.detail.id);
			console.log(`Notify fired! Delete: ${event.detail.command}, 'with', ${event.detail.id}`);
		} else if (event.detail.command === 'refresh') {
			console.log(`Notify fired! Refresh: ${event.detail.command}, 'with', ${event.detail.id}`);
		}
	}
</script>

<Grid>
	{#if rows != null}
		<DataTable title="Atributes" {headers} {rows} on:message={handleMessage} />
	{/if}
</Grid>
