<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
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

	export let session: Session | null;
	export let headers: ReadonlyArray<DataTableHeader>;
	export let rows: ReadonlyArray<DataTableRow>;
</script>

{#if !session}
	<h1>I am not logged in</h1>
{:else}
	<DataTable
		selectable
		sortable
		style="padding: 0px; overflow: auto; max-height: 100%; max-width: 100%;"
		{headers}
		{rows}
		{...$$restProps}
	>
		<Toolbar>
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows />
				<Select noLabel on:change={(e) => console.log('value')}>
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
				<div style="text-align: right">
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
{/if}
