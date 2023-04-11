<script lang="ts">
	import { afterNavigate, goto, invalidate } from '$app/navigation';
	import { base } from '$app/paths';
	import {
		Button,
		ButtonSet,
		Checkbox,
		ComboBox,
		Form,
		FormGroup,
		Modal,
		TextArea,
		TextInput,
		Tile
	} from 'carbon-components-svelte';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';
	import type { PageData } from './$types';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	export let data: PageData;
	const { category, categories, supabase } = data;
	//export let supabase: SupabaseClient;

	function shouldFilterItem(item: ComboBoxItem, value: string) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}
	let openDeleteModal: boolean = false;
	const newCategory = {
		description: category?.description || undefined,
		isactive: category?.isactive,
		isselfservice: category?.isselfservice,
		name: category?.name,
		parent_id: category?.parent_id,
		value: category?.value
	};
</script>

{#if category}
	<Tile>
		<form method="POST" action="?/update" use:enhance>
			<FormGroup>
				<TextInput readonly bind:value={category.id} name="id" labelText="Category ID" />
			</FormGroup>
			<FormGroup>
				<TextInput
					bind:value={newCategory.name}
					name="name"
					labelText="Category name"
					placeholder="Enter category name..."
				/>
			</FormGroup>
			<FormGroup>
				{#if categories}
					<ComboBox
						titleText="Parent category"
						placeholder="Select parent category"
						selectedId={newCategory.parent_id}
						name="parent_id"
						items={categories}
						{shouldFilterItem}
					/>
				{/if}
			</FormGroup>
			<FormGroup>
				<TextArea
					bind:value={newCategory.description}
					name="description"
					labelText="Category description"
					placeholder="Enter category description..."
				/>
			</FormGroup>
			<FormGroup>
				<Checkbox
					bind:value={newCategory.isselfservice}
					name="isselfservice"
					labelText="Is self service?"
				/>
				<Checkbox bind:value={newCategory.isactive} name="isactive" labelText="Is active?" />
			</FormGroup>
			<ButtonSet>
				<Button kind="secondary" on:click={() => goto(previousPage)}>Cancel</Button>
				<Button kind="danger" on:click={() => (openDeleteModal = true)}>Delete</Button>
				<button type="submit">Save</button>
			</ButtonSet>
		</form>
	</Tile>
{/if}

<Modal
	danger
	preventCloseOnClickOutside
	bind:open={openDeleteModal}
	modalHeading="Delete category"
	primaryButtonText="Delete"
	secondaryButtonText="Cancel"
	on:submit={async () => {
		const activeCategoryId = $page.url.searchParams.get('cat');
		const { data } = await supabase.from('m_product_category').delete().eq('id', activeCategoryId);
		invalidate('catalog:categories');
		openDeleteModal = false;
	}}
	on:click:button--secondary={() => (openDeleteModal = false)}
/>
