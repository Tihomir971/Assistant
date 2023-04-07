<script lang="ts">
	import RowInsert from 'carbon-icons-svelte/lib/RowInsert.svelte';
	import RowDelete from 'carbon-icons-svelte/lib/RowDelete.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import UpdateNow from 'carbon-icons-svelte/lib/UpdateNow.svelte';
	import RowCollapse from 'carbon-icons-svelte/lib/RowCollapse.svelte';
	import {
		Button,
		ComboBox,
		DataTable,
		FormGroup,
		Modal,
		TextInput,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		TreeView
	} from 'carbon-components-svelte';
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
	//import { activeId } from '$lib/stores/categoryStore';

	let searchValue: string = '';
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
	let activeId: TreeNodeId | undefined;

	import { createEventDispatcher } from 'svelte';
	import { convertToTreeStructure } from '$lib/utils/tree';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';
	import { page } from '$app/stores';
	const dispatch = createEventDispatcher();
	let expanded: boolean = false;
	$: children = convertToTreeStructure(categories);
	$: if (categories) {
		searchRow = categories.filter((row: { id: number; text: string; parent_id: number | null }) => {
			let rowName = row.text.toLowerCase();
			if (rowName.includes(searchValue.toLowerCase())) {
				return true;
			}
			return false;
		});
	} else {
		searchRow = [];
	}
	function rerunLoadFunction() {
		if (activeId) {
			const newUrl = new URL($page.url);
			newUrl?.searchParams?.set('cat', activeId.toString());
			goto(newUrl);
		}
		return;
	}
	function shouldFilterItem(item: ComboBoxItem, value: string) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
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
			<Button
				iconDescription="Edit"
				kind="ghost"
				icon={Edit}
				on:click={() => dispatch('edit', activeId)}
			/>
			<Button
				iconDescription="Refresh"
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
		<ToolbarSearch bind:expanded bind:value={searchValue} />
	</ToolbarContent>
</Toolbar>

{#await children}
	Loading
{:then children}
	{#if searchValue /* .length > 2 */ && searchRow}
		<DataTable
			style="overflow: auto; height: calc(100% - 50px);"
			size="short"
			rows={searchRow}
			headers={[{ key: 'text', value: 'Choose Category' }]}
			pageSize={16}
			on:click:row={(e) => {
				activeId = e.detail.id;
				rerunLoadFunction();
			}}
		/>
	{:else if children}
		<TreeView
			style="overflow: auto; height: calc(100% - 50px);"
			hideLabel
			bind:activeId
			bind:this={treeview}
			on:select={() => rerunLoadFunction()}
			{children}
		/>
	{/if}
{/await}

<Modal
	preventCloseOnClickOutside
	bind:open={openCreateModal}
	modalHeading="Create category"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:submit={async () => {
		const { data } = await supabase
			.from('m_product_category')
			.insert({ name: newCategoryName, parent_id: activeId });
		newCategoryName = '';
		invalidate('catalog:categories');
		openCreateModal = false;
	}}
	on:click:button--secondary={() => (openCreateModal = false)}
>
	<FormGroup>
		<TextInput
			bind:value={newCategoryName}
			labelText="Category name"
			placeholder="Enter category name..."
		/>
	</FormGroup>
	<FormGroup>
		{#if categories}
			<ComboBox
				titleText="Parent Category"
				placeholder="Parent product category"
				selectedId={activeId}
				items={categories}
				{shouldFilterItem}
			/>
		{/if}
	</FormGroup>
</Modal>
<Modal
	danger
	preventCloseOnClickOutside
	bind:open={openDeleteModal}
	modalHeading="Delete category"
	primaryButtonText="Delete"
	secondaryButtonText="Cancel"
	on:submit={async () => {
		const { data } = await supabase.from('m_product_category').delete().eq('id', activeId);
		invalidate('catalog:categories');
		openDeleteModal = false;
	}}
	on:click:button--secondary={() => (openDeleteModal = false)}
/>
