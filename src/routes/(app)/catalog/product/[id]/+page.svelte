<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { base } from '$app/paths';
	import {
		Button,
		ButtonSet,
		Checkbox,
		Column,
		ComboBox,
		DataTable,
		Form,
		FormGroup,
		Grid,
		Link,
		NumberInput,
		Row,
		Tab,
		TabContent,
		Tabs,
		TextInput,
		Tile
	} from 'carbon-components-svelte';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';
	import type { PageData } from './$types';
	import TableSkeleton from '$lib/components/TableSkeleton.svelte';
	import { Launch } from 'carbon-icons-svelte';
	import TableToolbarCatalog from '$lib/components/TableToolbarCatalog.svelte';
	import ProductGallery from '$lib/components/ProductGallery.svelte';
	import { enhance } from '$app/forms';
	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.href || previousPage;
	});

	export let data: PageData;
	const { supabase, product, categories, product_po, replenish, storageonhand, attributeset } =
		data;

	let url: string[] | undefined = product?.imageurl?.split(';');

	function shouldFilterItem(item: ComboBoxItem, value: string) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}
</script>

{#if product}
	<form method="post" action="?/update" use:enhance>
		<Grid>
			<Row padding>
				<Column>
					<ButtonSet>
						<Button kind="secondary" on:click={() => goto(previousPage)}>Cancel</Button>
						<Button type="submit">Save</Button>
					</ButtonSet>
				</Column>
			</Row>
			<Row>
				<Column lg={10}>
					<Tile>
						<FormGroup>
							<TextInput
								readonly
								name="id"
								bind:value={product.id}
								labelText="Product ID"
								placeholder="Enter product ID..."
							/>
						</FormGroup>
						<FormGroup>
							<TextInput
								readonly
								name="sku"
								bind:value={product.sku}
								labelText="Product SKU"
								placeholder="Enter product SKU..."
							/>
						</FormGroup>
						<FormGroup>
							<TextInput
								name="name"
								bind:value={product.name}
								labelText="Product name"
								placeholder="Enter user name..."
							/>
						</FormGroup>
						<FormGroup>
							<TextInput
								name="barcode"
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
								<input
									hidden
									name="m_product_category_id"
									bind:value={product.m_product_category_id}
								/>
								<ComboBox
									titleText="Category"
									placeholder="Select product category"
									bind:selectedId={product.m_product_category_id}
									items={categories}
									{shouldFilterItem}
								/>
							{/if}
						</FormGroup>
						{#if attributeset}
							<FormGroup>
								<input hidden name="m_attributeset_id" bind:value={product.m_attributeset_id} />
								<ComboBox
									titleText="Attribute Set"
									placeholder="Select Attribute Set"
									bind:selectedId={product.m_attributeset_id}
									items={attributeset}
									{shouldFilterItem}
								/>
							</FormGroup>
						{/if}

						<!-- 						<FormGroup>
							<TextInput
								bind:value={product.m_product_category_id}
								labelText="product_category"
								placeholder="Enter user name..."
							/>
						</FormGroup> -->
						<FormGroup>
							<TextInput
								name="condition"
								bind:value={product.condition}
								labelText="Condition"
								placeholder="Enter user name..."
							/>
						</FormGroup>
						<FormGroup>
							<NumberInput
								name="unitsperpack"
								bind:value={product.unitsperpack}
								label="The Units Per Pack indicates the no of units of a product packed together"
								placeholder="Enter unitsperpack..."
							/>
						</FormGroup>
						<FormGroup>
							<NumberInput
								name="unitsperpallet"
								bind:value={product.unitsperpallet}
								label="Units Per Pallet"
							/>
						</FormGroup>
						<FormGroup>
							<input hidden name="isselfservice" bind:value={product.isselfservice} />
							<Checkbox
								bind:checked={product.isselfservice}
								labelText="This is a Self-Service entry or this entry can be changed via Self-Service"
							/>
							<input hidden name="isactive" bind:value={product.isactive} />
							<Checkbox
								bind:checked={product.isactive}
								labelText="The record is active in the system"
							/>
							<input hidden name="discontinued" bind:value={product.discontinued} />
							<Checkbox
								bind:checked={product.discontinued}
								labelText="This product is no longer available"
							/>
						</FormGroup>
					</Tile>
				</Column>
				<Column>
					<!-- <SlideshowGallery {supabase} bind:url /> -->
					<ProductGallery
						{supabase}
						bucket="products"
						bind:url
						size={10}
						on:upload={() => {
							//profileForm.requestSubmit();
						}}
					/>
				</Column>
			</Row>
			<Row padding>
				<Column>
					<Tile
						style="border-color: rgb(198, 198, 198); border-top-width: 2px; border-top-style: solid;"
					>
						<Tabs>
							<Tab label="Product PO" />
							<Tab label="Replenish" />
							<Tab label="Stock" />
							<svelte:fragment slot="content">
								<TabContent>
									{#if product_po}
										<DataTable
											useStaticWidth
											size="short"
											headers={[
												{ key: 'c_bpartner.name', value: 'Seller' },
												{ key: 'vendorproductno', value: 'Seller PN' },
												{ key: 'pricelist', value: 'Price' },
												{ key: 'updated', value: 'Updated' },
												{ key: 'url', value: 'URL' }
											]}
											rows={product_po}
										>
											<svelte:fragment slot="cell" let:row let:cell>
												{#if cell.key === 'updated' || cell.key === 'created'}
													<span
														>{new Intl.DateTimeFormat('sr-Latn', {
															dateStyle: 'medium',
															timeStyle: 'medium'
														}).format(new Date(cell.value))}</span
													>
												{:else if cell.key.includes('url')}
													<Link icon={Launch} href={cell.value} target="_blank">{cell.value}</Link>
												{:else if typeof cell.value === 'number'}
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
									{/if}
								</TabContent>
								<TabContent>
									{#if replenish}
										<TableSkeleton
											useStaticWidth
											size="short"
											headers={[
												{ key: 'm_warehouse_id', value: 'warehouse' },
												{ key: 'level_min', value: 'level_min' },
												{ key: 'level_max', value: 'level_max' },
												{ key: 'm_warehousesource_id', value: 'm_warehousesource_id' }
											]}
											rows={replenish}
										>
											<TableToolbarCatalog />
										</TableSkeleton>
									{/if}
								</TabContent>
								<TabContent>
									{#if storageonhand}
										<TableSkeleton
											useStaticWidth
											size="short"
											headers={[
												{ key: 'm_warehouse.code', value: 'Warehouse' },
												{ key: 'qtyonhand', value: 'Quantity' },
												{ key: 'created', value: 'Created' },
												{ key: 'updated', value: 'Updated' }
											]}
											rows={storageonhand}
										/>
									{/if}
								</TabContent>
							</svelte:fragment>
						</Tabs>
					</Tile>
				</Column>
			</Row>
		</Grid>
	</form>
{/if}
