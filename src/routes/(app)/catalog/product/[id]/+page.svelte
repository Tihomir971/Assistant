<script lang="ts">
	import { afterNavigate, goto, invalidate } from '$app/navigation';
	import { base } from '$app/paths';
	import {
		Button,
		ButtonSet,
		Checkbox,
		Column,
		ComboBox,
		FormGroup,
		Grid,
		Modal,
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
	import Gallery from '$lib/components/Gallery/Gallery.svelte';
	import { enhance } from '$app/forms';
	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.href || previousPage;
	});

	export let data: PageData;
	const { supabase, product, categories, attributeset, streamed } = data;

	let partners = data.partners;
	let openProduct_po = false;
	let newPartnerId: number;
	let newVendorProductNo: string;
	let newUrl: string;
	let partnerName: string | null = null;

	function shouldFilterItem(item: ComboBoxItem, value: string) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}
	async function searchPartner() {
		const urlObj = new URL(newUrl);
		const hostnameArray = urlObj.hostname.split('.');
		const secondLevelDomain = hostnameArray.slice(-2, -1)[0];

		const { data } = await supabase
			.from('c_bpartner')
			.select('id, name')
			.ilike('name', `%${secondLevelDomain}%`)
			.single();
		partnerName = data?.name ?? null;
	}
</script>

<Grid padding>
	<Row>
		<Column>
			{#if product}
				<Tabs>
					<Tab label="Product" />
					<Tab label="product_po" />
					<Tab label="replenish" />
					<Tab label="Storage" />
					<svelte:fragment slot="content">
						<!-- Product details -->
						<form method="post" action="?/update" use:enhance>
							<TabContent>
								<Row>
									<ButtonSet>
										<Button kind="secondary" on:click={() => goto(previousPage)}>Cancel</Button>
										<Button type="submit">Save</Button>
									</ButtonSet>
								</Row>
								<Row>
									<Column noGutterLeft lg={10}>
										<Tile>
											<FormGroup>
												<TextInput
													inline
													readonly
													name="id"
													bind:value={product.id}
													labelText="Product ID"
													placeholder="Enter product ID..."
												/>
											</FormGroup>
											<FormGroup>
												<TextInput
													inline
													readonly
													name="sku"
													bind:value={product.sku}
													labelText="Product SKU"
													placeholder="Enter product SKU..."
												/>
											</FormGroup>
											<FormGroup>
												<TextInput
													inline
													name="name"
													bind:value={product.name}
													labelText="Product name"
													placeholder="Enter user name..."
												/>
											</FormGroup>
											<FormGroup>
												<TextInput
													inline
													name="barcode"
													bind:value={product.barcode}
													labelText="Product barcode"
													placeholder="Enter user name..."
												/>
											</FormGroup>

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
													<input
														hidden
														name="m_attributeset_id"
														bind:value={product.m_attributeset_id}
													/>
													<ComboBox
														titleText="Attribute Set"
														placeholder="Select Attribute Set"
														bind:selectedId={product.m_attributeset_id}
														items={attributeset}
														{shouldFilterItem}
													/>
												</FormGroup>
											{/if}

											<FormGroup>
												<NumberInput
													name="unitsperpack"
													bind:value={product.unitsperpack}
													label="Units Per Pack"
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
									<Column noGutterRight>
										<!-- <SlideshowGallery {supabase} bind:url /> -->
										{#await streamed.images then images}
											<Gallery {images} />
										{/await}
									</Column>
								</Row>
							</TabContent>
						</form>
						<TabContent>
							<Row>
								<ButtonSet>
									<Button on:click={() => (openProduct_po = true)}>Add product</Button>
								</ButtonSet>
							</Row>
							<Row>
								{#await streamed.product_po then product_po}
									{#if product_po}
										<TableSkeleton
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
										/>
									{/if}
								{/await}
							</Row>
						</TabContent>
						<TabContent>
							<Row>
								{#await streamed.replenish then replenish}
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
										/>
									{/if}
								{/await}
							</Row>
						</TabContent>
						<TabContent>
							<Row>
								{#await streamed.storageonhand then storageonhand}
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
								{/await}
							</Row>
						</TabContent>
					</svelte:fragment>
				</Tabs>
			{/if}
		</Column>
	</Row>
</Grid>
<Modal
	bind:open={openProduct_po}
	modalHeading="Add vendor product"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	selectorPrimaryFocus="#vendor-id"
	on:click:button--secondary={() => (openProduct_po = false)}
	on:open
	on:close
	on:submit={async () => {
		if (product?.id) {
			console.log('new PO', newPartnerId, product.id, newVendorProductNo, newUrl);

			const { error } = await supabase.from('m_product_po').insert({
				c_bpartner_id: newPartnerId,
				m_product_id: product.id,
				vendorproductno: newVendorProductNo,
				url: newUrl
			});
			if (error) {
				console.log('error inserting Product_po', error);
			}
		}
		invalidate('catalog:product:id');
		openProduct_po = false;
	}}
>
	{#if partners}
		<ComboBox
			titleText="Vendor"
			placeholder="Select bussines partner"
			bind:items={partners}
			{shouldFilterItem}
			bind:selectedId={newPartnerId}
		/>
	{/if}
	<TextInput
		id="vendor-sku"
		labelText="Vendor SKU"
		placeholder="Enter vendor SKU..."
		bind:value={newVendorProductNo}
	/>
	<br />
	<TextInput
		id="vendor-url"
		labelText="Product URL"
		placeholder="Enter product url..."
		bind:value={newUrl}
		on:blur={searchPartner}
	/>
	{#if partnerName}
		<h3>Izabrani parner: {partnerName}</h3>
		<br />
	{/if}
</Modal>
