<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import {
		Button,
		Dropdown,
		MultiSelect,
		Toolbar,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';
	import type { MultiSelectItemId } from 'carbon-components-svelte/types/MultiSelect/MultiSelect.svelte';
	import { Filter, UpdateNow, WatsonHealthZoomPan } from 'carbon-icons-svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let onStock = true;
	let multiselectSelectedIds: MultiSelectItemId[] = [];

	function submitForm(formName: string) {
		const form = document.getElementById(formName) as HTMLFormElement;
		form.submit();
	}
</script>

<Toolbar>
	<ToolbarContent>
		<MultiSelect
			useTitleInItem
			type="inline"
			bind:selectedIds={multiselectSelectedIds}
			label="Select Prices..."
			items={[
				{ id: '1', text: 'Purchase' },
				{ id: '0', text: 'Market' },
				{ id: '4', text: 'Retail' }
			]}
		/>
		<Dropdown
			style="column-gap: 0rem"
			type="inline"
			selectedId
			label="Select View"
			titleText="View:"
			items={[
				{ id: 'stock', text: 'Stock' },
				{ id: 'pricing', text: 'Pricing' },
				{ id: 'replenish', text: 'Replenish' }
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
		<form id="marketResearchForm" action="/catalog?/marketResearch" method="POST">
			<Button
				iconDescription="Market research"
				tooltipPosition="left"
				kind="ghost"
				icon={WatsonHealthZoomPan}
				on:click={() => {
					/* submitForm('marketResearchForm'); */
					dispatch('research');
				}}
			/>
		</form>
		<Button
			iconDescription="Refresh products"
			tooltipPosition="left"
			kind="ghost"
			icon={UpdateNow}
			on:click={() => {
				invalidate('catalog:products');
			}}
		/>
	</ToolbarContent>
</Toolbar>
