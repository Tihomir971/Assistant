<script lang="ts">
	import { page } from '$app/stores';

	import {
		Button,
		Dropdown,
		Toolbar,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';
	import { Filter, UpdateNow } from 'carbon-icons-svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let onStock = true;
</script>

<Toolbar>
	<ToolbarContent>
		<Dropdown
			style="column-gap: 0rem"
			type="inline"
			selectedId
			label="Select View"
			titleText="View:"
			items={[
				{ id: '5', text: 'Retail' },
				{ id: '2', text: 'Wholesale' },
				{ id: '6', text: 'Service' }
			]}
			on:select
		/>

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
