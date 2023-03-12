<script lang="ts">
	import { DataTable } from 'carbon-components-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: ({ categoryTable, user } = data);
</script>

<div class="block">
	<p>Protected content for {user.email}</p>
	<p>server-side fetched data with RLS:</p>
	<!-- <pre>{JSON.stringify(categoryTable, null, 2)}</pre> -->
</div>
<slot>Catalog Layout</slot>
{#if categoryTable}
	<DataTable
		headers={[
			{ key: 'id', value: 'ID' },
			{ key: 'parent_id', value: 'Parent' },
			{ key: 'name', value: 'Name' }
		]}
		rows={categoryTable}
	/>
{/if}
