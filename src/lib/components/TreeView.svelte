<script lang="ts">
	import RowInsert from 'carbon-icons-svelte/lib/RowInsert.svelte';
	import RowDelete from 'carbon-icons-svelte/lib/RowDelete.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import UpdateNow from 'carbon-icons-svelte/lib/UpdateNow.svelte';
	import RowCollapse from 'carbon-icons-svelte/lib/RowCollapse.svelte';
	import {
		Button,
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		TreeView
	} from 'carbon-components-svelte';
	import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import type {
		TreeNode,
		TreeNodeId
	} from 'carbon-components-svelte/types/TreeView/TreeView.svelte';

	//export
	let children: TreeNode[] | undefined;
	export let categoryTable:
		| {
				id: number;
				text: string;
				parent_id: number | null;
		  }[]
		| null;
	export let activeId: TreeNodeId = '';

	let value: any = '';
	let searchRow:
		| {
				id: number;
				text: string;
				parent_id: number | null;
		  }[]
		| null;
	//	let searchRow: ReadonlyArray<DataTableRow>;
	let treeview: TreeView;

	import { createEventDispatcher } from 'svelte';
	import { convertToTreeStructure } from '$lib/utils/tree';
	const dispatch = createEventDispatcher();
	let expanded: boolean = false;
	$: children = convertToTreeStructure(categoryTable);
	$: if (categoryTable) {
		searchRow = categoryTable.filter(
			(row: { id: number; text: string; parent_id: number | null }) => {
				let rowName = row.text.toLowerCase();
				if (rowName.includes(value.toLowerCase())) {
					return true;
				}
				return false;
			}
		);
	} else {
		searchRow = [];
	}
</script>

<Toolbar>
	<ToolbarContent>
		{#if !expanded}
			<Button
				iconDescription="Add"
				tooltipAlignment="start"
				kind="ghost"
				icon={RowInsert}
				on:click={() => dispatch('create')}
			/>
			<Button
				iconDescription="Delete"
				kind="ghost"
				icon={RowDelete}
				on:click={() => dispatch('delete')}
			/>
			<Button iconDescription="Edit" kind="ghost" icon={Edit} on:click={() => dispatch('edit')} />
			<Button
				iconDescription="Update"
				kind="ghost"
				icon={UpdateNow}
				on:click={() => dispatch('update')}
			/>
			<Button
				iconDescription="Collapse All"
				tooltipAlignment="end"
				kind="ghost"
				icon={RowCollapse}
				on:click={treeview?.collapseAll}
			/>
		{/if}
		<ToolbarSearch bind:expanded bind:value />
	</ToolbarContent>
</Toolbar>

{#if value && searchRow}
	<DataTable
		style="overflow: auto; height: 100%"
		size="short"
		rows={searchRow}
		headers={[{ key: 'text', value: 'Choose Category' }]}
		pageSize={16}
		on:click:row={(e) => {
			activeId = e.detail.id;
		}}
	/>
{:else if children}
	<TreeView
		style="overflow: auto; height: calc(100% - 50px);"
		hideLabel
		bind:activeId
		bind:this={treeview}
		{children}
	/>
{/if}
