<script lang="ts">
	import DataTable from '$lib/components/DataTable.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import {
		Column,
		Grid,
		Row,
		Tab,
		TabContent,
		Tabs,
		TextInput,
		Toggle
	} from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ rows, attribute_options } = data);

	let headers = [
		{ key: 'id', value: 'ID' },
		{ key: 'code', value: 'code' },
		{ key: 'name', value: 'name' }
	];
	let nav = [
		{ href: '/', text: 'Catalog' },
		{ href: '/catalog/attribute', text: 'Attributes' },
		{ href: '/catalog/attribute', text: 'Atribut' }
	];
</script>

<Grid>
	<Breadcrumb {nav} />
	<Row>
		<Column>
			<h3 style="margin-bottom: 2rem;">{rows?.name}</h3>
			<Tabs>
				<Tab label="Properties" />
				{#if attribute_options}
					<Tab label="Options" />
				{/if}
				<Tab label="Label translations" />
				<svelte:fragment slot="content">
					<TabContent>
						<Toggle labelText="Active" toggled={rows?.isactive} />
						<TextInput labelText="ID" value={rows?.id} />
						<TextInput labelText="Code" value={rows?.code} />
						<TextInput labelText="Name" value={rows?.name} />
						<TextInput labelText="Frontend Input" value={rows?.frontend_input} />
						<TextInput labelText="Entity Type" value={rows?.entity_type_id} /></TabContent
					>
					{#if attribute_options}
						<TabContent><DataTable {headers} rows={attribute_options} /></TabContent>
					{/if}
					<TabContent>Content 3</TabContent>
				</svelte:fragment>
			</Tabs>
		</Column>
	</Row>
</Grid>
