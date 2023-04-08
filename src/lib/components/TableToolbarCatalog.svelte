<script lang="ts">
	import { page } from '$app/stores';

	import { Button, Toolbar, ToolbarContent, ToolbarSearch } from 'carbon-components-svelte';
	import { Filter, UpdateNow } from 'carbon-icons-svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let onStock = true;
</script>

<Toolbar>
	<ToolbarContent>
		<ToolbarSearch shouldFilterRows />
		<Button
			iconDescription="Hide out of Stock"
			tooltipPosition="left"
			kind="ghost"
			bind:isSelected={onStock}
			icon={Filter}
			on:click={() => {
				dispatch('filterStock');
			}}
		/>
		<Button
			iconDescription="Update"
			tooltipPosition="left"
			kind="ghost"
			icon={UpdateNow}
			on:click={() => {
				dispatch('update');
			}}
		/>
	</ToolbarContent>
</Toolbar>
