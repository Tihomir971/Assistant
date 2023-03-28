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
	export let headers: DataTableHeader[];
	export let rows: DataTableRow[];
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
			<Select noLabel>
				<SelectItem value="white" text="White" />
				<SelectItem value="g10" />
				<SelectItem value="g80" />
				<SelectItem value="g90" />
				<SelectItem value="g100" />
			</Select>
		</ToolbarContent>
	</Toolbar>
	<svelte:fragment slot="cell" let:cell let:row>
		{#if typeof cell.value === 'number'}
			<div style="text-align:right">
				{new Intl.NumberFormat('sr-Latn-RS', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				}).format(cell.value)}
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
