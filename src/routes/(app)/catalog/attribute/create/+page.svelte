<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { Button, FormGroup, Modal, TextInput, Tile } from 'carbon-components-svelte';
	import { error } from '@sveltejs/kit';

	export let form: ActionData;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		console.log('ERR', form?.error, 'Mess', form?.message);
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

<Tile style="width: 30rem;">
	<div class="bx--data-table-header">
		<h4>Create new Attribute</h4>
	</div>
	{#if form?.error}
		<div class="block notification is-danger">{form.error}</div>
	{/if}
	{#if form?.message}
		<div class="block notification is-primary">{form.message}</div>
	{/if}
	<form method="post" use:enhance={handleSubmit}>
		<FormGroup>
			<TextInput
				name="code"
				value={form?.values?.code ?? ''}
				labelText="Code"
				placeholder="Enter code..."
				required
			/>
		</FormGroup>
		<FormGroup>
			<TextInput
				name="name"
				value={form?.values?.name ?? ''}
				labelText="Name"
				placeholder="Enter name..."
				required
			/>
		</FormGroup>

		<Button type="submit" disabled={loading}>Create</Button>
	</form>
</Tile>
