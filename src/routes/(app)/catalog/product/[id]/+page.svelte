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
		Link,
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
	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.href || previousPage;
	});

	export let data: PageData;
	const { supabase, product, categories, product_po, replenish, storageonhand } = data;
	//$: ({ images } = data);
	let images = product?.imageurl?.split(';');
	let url: string[] | undefined = product?.imageurl?.split(';');

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
			<Column lg={8}>
				<Tile>
					<Form>
						<FormGroup>
							<TextInput
								readonly
								bind:value={product.id}
								labelText="Product ID"
								placeholder="Enter product ID..."
							/>
						</FormGroup>
						<FormGroup>
							<TextInput
								readonly
								bind:value={product.sku}
								labelText="Product SKU"
								placeholder="Enter product SKU..."
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
								inline
								bind:value={product.condition}
								labelText="condition"
								placeholder="Enter user name..."
							/>
						</FormGroup>
					</Form>
				</Tile>
			</Column>
			<Column lg={4}>
				<!-- <SlideshowGallery {supabase} bind:url /> -->
				<ProductGallery
					{supabase}
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
{/if}
