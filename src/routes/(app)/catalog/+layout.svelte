<script lang="ts">
	import TreeView from '$lib/components/TreeView.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: ({ children, categoryTable, user } = data);
</script>

<div class="block">
	<p>Protected content for {user.email}</p>
	<p>server-side fetched data with RLS:</p>
	<!-- <pre>{JSON.stringify(categoryTable, null, 2)}</pre> -->
</div>
<slot>Catalog Layout</slot>
{#if categoryTable}
	<TreeView {children} {categoryTable} />
{/if}
