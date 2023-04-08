<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { base } from '$app/paths';
	import {
		Button,
		ButtonSet,
		Column,
		ComboBox,
		DataTable,
		Form,
		FormGroup,
		Grid,
		Row,
		Tab,
		TabContent,
		Tabs,
		TextInput,
		Tile
	} from 'carbon-components-svelte';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	let previousPage: string = base;

	afterNavigate(({ from }) => {
		console.log('from', from);
		previousPage = from?.url.href || previousPage;
		console.log('previousPage', previousPage);
	});

	export let data: PageData;
	const { product, categories, product_po, replenish } = data;

	function shouldFilterItem(item: ComboBoxItem, value: string) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}
</script>

{#if product}
	<Grid>
		<Row padding>
			<Column>
				<ButtonSet>
					<Button kind="secondary" on:click={() => goto(previousPage)}>Cancel</Button>
					<Button>Save</Button>
				</ButtonSet>
			</Column>
		</Row>
		<Row>
			<Column>
				<Tile>
					<Form>
						<FormGroup>
							<TextInput
								readonly
								bind:value={product.id}
								labelText="Product ID"
								placeholder="Enter user name..."
							/>
						</FormGroup>
						<FormGroup>
							<TextInput
								bind:value={product.name}
								labelText="Product name"
								placeholder="Enter user name..."
							/>
						</FormGroup>
						<FormGroup>
							<TextInput
								bind:value={product.barcode}
								labelText="Product barcode"
								placeholder="Enter user name..."
							/>
						</FormGroup>
						<!-- 						<FormGroup>
							<TextInput
								bind:value={product.c_tax.rate}
								labelText="Product tax"
								placeholder="Enter user name..."
							/>
						</FormGroup> -->
						<!-- 						<FormGroup>
							<TextInput
								bind:value={product.c_uom_id}
								labelText="Product UOM"
								placeholder="Enter user name..."
							/>
						</FormGroup> -->
						<FormGroup>
							{#if categories}
								<ComboBox
									titleText="Category"
									placeholder="Select product category"
									selectedId={product.m_product_category_id}
									items={categories}
									{shouldFilterItem}
								/>
							{/if}
						</FormGroup>
						<!-- 						<FormGroup>
							<TextInput
								bind:value={product.m_product_category_id}
								labelText="product_category"
								placeholder="Enter user name..."
							/>
						</FormGroup> -->
						<FormGroup>
							<TextInput
								bind:value={product.condition}
								labelText="condition"
								placeholder="Enter user name..."
							/>
						</FormGroup>
					</Form>
				</Tile>
			</Column>
		</Row>
		<Row padding>
			<Column>
				<Tile
					style="border-color: rgb(198, 198, 198); border-top-width: 2px; border-top-style: solid;"
				>
					<Tabs>
						<Tab label="Product PO" />
						<Tab label="Tab label 2" />
						<Tab label="Tab label 3" />
						<svelte:fragment slot="content">
							<TabContent>
								{#if product_po}
									<DataTable
										size="short"
										headers={[
											{ key: 'c_bpartner_id', value: 'Partner' },
											{ key: 'vendorproductno', value: 'Vendor PN' },
											{ key: 'pricelist', value: 'Price' },
											{ key: 'updated', value: 'updated' },
											{ key: 'url', value: 'URL' }
										]}
										rows={product_po}
									>
										<svelte:fragment slot="cell" let:row let:cell>
											{#if cell.key === 'updated' || cell.key === 'created'}
												<span>{new Date(cell.value).toLocaleString('en-US')}</span>
											{/if}
										</svelte:fragment>
									</DataTable>
								{/if}
							</TabContent>
							<TabContent>
								{#if replenish}
									<DataTable
										size="short"
										headers={[
											{ key: 'm_warehouse_id', value: 'warehouse' },
											{ key: 'level_min', value: 'level_min' },
											{ key: 'level_max', value: 'level_max' },
											{ key: 'm_warehousesource_id', value: 'm_warehousesource_id' }
										]}
										rows={replenish}
									/>
								{/if}</TabContent
							>
							<TabContent>Content 3</TabContent>
						</svelte:fragment>
					</Tabs>
				</Tile>
			</Column>
		</Row>
	</Grid>
{/if}
