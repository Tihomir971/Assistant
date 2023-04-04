<script lang="ts">
	import type {
		DataTableHeader,
		DataTableRow
	} from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import {
		Button,
		ButtonSet,
		DataTable,
		OverflowMenu,
		OverflowMenuItem,
		Select,
		SelectItem,
		Toolbar,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import { Filter } from 'carbon-icons-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	export let headers: DataTableHeader[];
	export let rows: DataTableRow[];

	let onStock = true;
	//$: console.log('onStock', onStock);
	$: headers.push({ key: 'menu', empty: true });
</script>

<DataTable
	size="short"
	batchSelection
	sortable
	style="padding: 0px; overflow: auto; height: 100%; max-width: 100%;"
	{headers}
	{rows}
	{...$$restProps}
>
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
					onStock = !onStock;
					const newUrl = new URL($page.url);
					newUrl?.searchParams?.set('onStock', onStock.toString());
					goto(newUrl);
				}}
			/>
		</ToolbarContent>
	</Toolbar>
	<svelte:fragment slot="cell" let:cell let:row>
		<!-- {#if cell.key === 'priceRecommended'}
			<div style="text-align:right">
				{new Intl.NumberFormat('sr-Latn-RS', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				}).format(cell.value)}
			</div> -->
		{#if typeof cell.value === 'number'}
			<div style="text-align:right">
				{new Intl.NumberFormat('sr-Latn-RS', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				}).format(cell.value)}
			</div>
		{:else if cell.key === 'sku'}
			<div style="text-align:right">
				{cell.value}
			</div>
		{:else if cell.key === 'menu'}
			<OverflowMenu flipped>
				<OverflowMenuItem
					on:click={() => {
						dispatch('edit', row.id);
					}}
					>Edit
				</OverflowMenuItem>
				<OverflowMenuItem
					danger
					on:click={() => {
						dispatch('delete', row.id);
					}}
				>
					Delete
				</OverflowMenuItem>
			</OverflowMenu>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>
