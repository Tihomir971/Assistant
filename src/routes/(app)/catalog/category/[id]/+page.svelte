<script lang="ts">
	import { afterNavigate, goto, invalidate } from '$app/navigation';
	import { base } from '$app/paths';
	import {
		Button,
		ButtonSet,
		Checkbox,
		ComboBox,
		FormGroup,
		Modal,
		TextArea,
		TextInput,
		Tile
	} from 'carbon-components-svelte';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	export let data: PageData;
	const { category, categories, supabase } = data;

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
		<form method="POST" action="?/update">
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
					<input hidden name="parent_id" bind:value={newCategory.parent_id} />
					<ComboBox
						titleText="Parent category"
						placeholder="Select parent category"
						bind:selectedId={newCategory.parent_id}
						items={categories}
						{shouldFilterItem}
					/>
					{newCategory.parent_id}
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
				<input hidden name="isselfservice" bind:value={newCategory.isselfservice} />
				<Checkbox bind:checked={newCategory.isselfservice} labelText="Is self service?" />
				{newCategory.isselfservice}
				<input hidden name="isactive" bind:value={newCategory.isactive} />
				<Checkbox bind:checked={newCategory.isactive} labelText="Is active?" />
				{newCategory.isactive}
			</FormGroup>
			<ButtonSet>
				<Button kind="secondary" on:click={() => goto(previousPage)}>Cancel</Button>
				<Button kind="danger" on:click={() => (openDeleteModal = true)}>Delete</Button>
				<Button type="submit">Save</Button>
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
