<script lang="ts">
	import RowInsert from 'carbon-icons-svelte/lib/RowInsert.svelte';
	import RowDelete from 'carbon-icons-svelte/lib/RowDelete.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import UpdateNow from 'carbon-icons-svelte/lib/UpdateNow.svelte';
	import RowCollapse from 'carbon-icons-svelte/lib/RowCollapse.svelte';
	import {
		Button,
		DataTable,
		Modal,
		TextInput,
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
	export let supabase: SupabaseClient;
	export let categories:
		| {
				id: number;
				text: string;
				parent_id: number | null;
		  }[]
		| null;
	//export let activeId: TreeNodeId = '';
	import { activeId } from '$lib/stores/categoryStore';

	let value: any = '';
	let openCreateModal: boolean = false;
	let openDeleteModal: boolean = false;
	let newCategoryName: string;
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
	import { invalidate, invalidateAll } from '$app/navigation';
	import { Equalizer, TextIndent } from 'carbon-icons-svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	const dispatch = createEventDispatcher();
	let expanded: boolean = false;
	$: children = convertToTreeStructure(categories);
	$: if (categories) {
		searchRow = categories.filter((row: { id: number; text: string; parent_id: number | null }) => {
			let rowName = row.text.toLowerCase();
			if (rowName.includes(value.toLowerCase())) {
				return true;
			}
			return false;
		});
	} else {
		searchRow = [];
	}
	function rerunLoadFunction() {
		invalidate('catalog:products');
		return;
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
				on:click={() => (openCreateModal = true)}
			/>
			<Button
				iconDescription="Delete"
				kind="ghost"
				icon={RowDelete}
				on:click={() => (openDeleteModal = true)}
			/>
			<Button iconDescription="Edit" kind="ghost" icon={Edit} on:click={() => dispatch('edit')} />
			<Button
				iconDescription="Update Me"
				kind="ghost"
				icon={UpdateNow}
				on:click={() => {
					invalidate('catalog:categories');
				}}
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
			$activeId = e.detail.id;
			rerunLoadFunction();
		}}
	/>
{:else if children}
	<TreeView
		style="overflow: auto; height: calc(100% - 50px);"
		hideLabel
		bind:activeId={$activeId}
		bind:this={treeview}
		on:select={() => rerunLoadFunction()}
		{children}
	/>
{/if}

<Modal
	preventCloseOnClickOutside
	bind:open={openCreateModal}
	modalHeading="Create category"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:submit={async () => {
		const { data } = await supabase
			.from('m_product_category')
			.insert({ name: newCategoryName, parent_id: $activeId });
		console.log('New Category', data);
		invalidate('catalog:categories');
		openCreateModal = false;
	}}
	on:click:button--secondary={() => (openCreateModal = false)}
>
	<TextInput
		bind:value={newCategoryName}
		labelText="Category name"
		placeholder="Enter category name..."
	/>
</Modal>
<Modal
	danger
	preventCloseOnClickOutside
	bind:open={openDeleteModal}
	modalHeading="Delete category"
	primaryButtonText="Delete"
	secondaryButtonText="Cancel"
	on:submit={async () => {
		const { data } = await supabase.from('m_product_category').delete().eq('id', $activeId);
		invalidate('catalog:categories');
		openDeleteModal = false;
	}}
	on:click:button--secondary={() => (openDeleteModal = false)}
/>
