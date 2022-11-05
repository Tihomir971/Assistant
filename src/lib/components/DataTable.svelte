<script lang="ts">
	import type {
		DataTableRow,
		DataTableHeader
	} from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import UpdateNow from 'carbon-icons-svelte/lib/UpdateNow.svelte';
	import {
		Button,
		DataTable,
		OverflowMenu,
		OverflowMenuItem,
		Toolbar,
		ToolbarBatchActions,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let title: string | undefined = undefined;
	export let rows: DataTableRow[];
	export let headers: DataTableHeader[];
	export let selectable: boolean = false;
	export let stickyHeader: boolean = false;

	$: headers.push({ key: 'columnMenu', empty: true, columnMenu: true, width: '80px' });
</script>

<DataTable {title} {headers} {rows} {selectable} {stickyHeader} on:click:row>
	<svelte:fragment slot="cell" let:row let:cell>
		{#if cell.key === 'columnMenu'}
			<OverflowMenu flipped>
				<OverflowMenuItem>Edit</OverflowMenuItem>
				<OverflowMenuItem
					danger
					on:click={(e) => {
						console.log('Delete');
					}}
				>
					Delete
				</OverflowMenuItem>
			</OverflowMenu>
		{:else if row[cell.key] === null}
			<span />
		{:else if cell.value instanceof Date}
			<span>Hello </span>
		{:else}{cell.value}{/if}
	</svelte:fragment>
	<Toolbar>
		<ToolbarBatchActions>
			<Button on:click={() => {}}>Delete</Button>
		</ToolbarBatchActions>
		<ToolbarContent>
			<ToolbarSearch persistent shouldFilterRows />
			<Button
				iconDescription="Add"
				tooltipAlignment="start"
				kind="ghost"
				icon={Add}
				on:click={() => {
					dispatch('message', {
						text: 'Add'
					});
				}}
			/>
			<Button
				kind="ghost"
				size="field"
				iconDescription="Refresh"
				icon={UpdateNow}
				on:click={() => {
					dispatch('message', {
						text: 'refresh'
					});
				}}
			/>
		</ToolbarContent>
	</Toolbar>
</DataTable>

<style>
	:global(.bx--data-table--sticky-header) {
		max-height: calc(100vh - 3rem - 3rem);
	}
	:global(.bx--data-table-container) {
		padding-top: 0px;
	}
</style>
