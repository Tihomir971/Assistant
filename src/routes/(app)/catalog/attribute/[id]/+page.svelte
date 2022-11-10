<script lang="ts">
	import {
		Column,
		Grid,
		Row,
		Switch,
		Tab,
		TabContent,
		Tabs,
		TextInput,
		Toggle
	} from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ rows } = data);
</script>

<Grid>
	<Row>
		<Column>
			<h3 style="margin-bottom: 2rem;">{rows?.name}</h3>
			<Tabs>
				<Tab label="Properties" />
				<Tab label="Options" />
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
					<TabContent>Content 2</TabContent>
					<TabContent>Content 3</TabContent>
				</svelte:fragment>
			</Tabs>
		</Column>
	</Row>
</Grid>
