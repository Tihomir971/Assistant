<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import {
		Button,
		FormGroup,
		NumberInput,
		Select,
		SelectItem,
		TextInput,
		Toggle
	} from 'carbon-components-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

<section class="columns mt-6 pt-6">
	<div class="column is-half is-offset-one-quarter">
		<h1 class="title">Sign up</h1>
		{#if form?.error}
			<div class="block notification is-danger">{form.error}</div>
		{/if}
		{#if form?.message}
			<div class="block notification is-primary">{form.message}</div>
		{/if}
		<form method="post" use:enhance={handleSubmit}>
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
				<Select
					bind:selected
					labelText="Frontend Type"
					on:change={(e) => console.log('value', e.detail)}
				>
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
				<NumberInput
					id="entity_type_id"
					name="entity_type_id"
					value={form?.values?.entity_type_id ?? ''}
					labelText="Frontend Type"
					placeholder="Enter Frontend Type..."
					required
				/>
			</FormGroup>
			<Button disabled={loading}>Create</Button>
		</form>

		<div class="mt-6">
			<p class="has-text-centered">
				Already have an account? <a href="/">Sign in</a>
			</p>
		</div>
	</div>
</section>

<div>
	<form
		method="POST"
		action="/catalog/attribute/new"
		use:enhance={() => {
			state = 'creating';

			return ({ result }) => {
				switch (result.type) {
					case 'error':
						state = new Error(result.error ?? 'Something went wrong creating idea!');
						break;
					case 'invalid':
						state = new Error('Something went wrong creating idea!');
						break;
					case 'redirect':
						goto(result.location);
						break;
					case 'success':
					default:
						state = 'success';
						goto('/dashboard/ideas');
						break;
				}
			};
		}}
	/>
</div>

<style>
	div {
		position: absolute;
		/* width: calc(100% - var(--cds-spacing-05)); */
		width: 765px;
		height: calc(100% - var(--cds-spacing-06));
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--cds-text-02);
	}
</style>
