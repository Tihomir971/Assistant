<script lang="ts">
	import type { ActionData } from './$types';
	import { FormGroup, Select, SelectItem, TextInput } from 'carbon-components-svelte';

	export let form: ActionData;
	$: console.log('front input', form?.values?.frontend_input);
	let selected = 'select';
	$: form.values.frontend_input = selected;
</script>

<FormGroup>
	<TextInput
		id="code"
		name="code"
		value={form?.values?.code ?? ''}
		labelText="Code"
		placeholder="Enter code..."
		required
	/>
</FormGroup>
<FormGroup>
	<TextInput
		id="name"
		name="Name"
		value={form?.values?.name ?? ''}
		labelText="Name"
		placeholder="Enter name..."
		required
	/>
</FormGroup>
<FormGroup>
	<TextInput
		id="backend_type"
		name="backend_type"
		value={form?.values?.backend_type ?? ''}
		labelText="Backend Type"
		placeholder="Enter Backend Type..."
		required
	/>
</FormGroup>
<FormGroup>
	<Select bind:selected labelText="Frontend Type" on:change={(e) => console.log('value', e.detail)}>
		<SelectItem value="select" text="Select" />
		<SelectItem value="multiselect" text="Multiselect" />
	</Select>
</FormGroup>
<FormGroup>
	<TextInput
		id="frontend_input"
		name="frontend_input"
		value={form?.values?.frontend_input ?? ''}
		labelText="Frontend Type"
		placeholder="Enter Frontend Type..."
		required
	/>
</FormGroup>
<FormGroup>
	<TextInput
		id="entity_type_id"
		name="entity_type_id"
		value={form?.values?.entity_type_id ?? ''}
		labelText="Frontend Type"
		placeholder="Enter Frontend Type..."
		required
	/>
</FormGroup>
