<script lang="ts">
	import type {
		DataTableHeader,
		DataTableRow
	} from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import {
		DataTable,
		Select,
		SelectItem,
		Toolbar,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';

	export let headers: ReadonlyArray<DataTableHeader>;
	export let rows: ReadonlyArray<DataTableRow>;
</script>

<DataTable
	size="short"
	batchSelection
	sortable
	style="padding: 0px; overflow: auto; max-height: 100%; max-width: 100%;"
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
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>
