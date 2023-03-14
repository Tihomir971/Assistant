<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import {
		Button,
		Column,
		FormGroup,
		PasswordInput,
		Row,
		TextInput,
		Tile
	} from 'carbon-components-svelte';

	export let form: ActionData;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<Tile style="width: 480px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
	<FormGroup>
		<h2>Sign in</h2>
	</FormGroup>
	{#if form?.error}
		<div class="block notification is-danger">{form.error}</div>
	{/if}
	<form method="post" use:enhance={handleSubmit}>
		<FormGroup>
			<TextInput
				labelText="Email"
				id="email"
				name="email"
				value={form?.values?.email ?? ''}
				class="input"
				type="email"
				placeholder="Enter your email"
				autocomplete="email"
				required
			/>
		</FormGroup>
		<FormGroup>
			<PasswordInput
				labelText="Password"
				id="password"
				name="password"
				class="input"
				type="password"
				placeholder="Enter password"
				autocomplete="current-password"
				required
			/>
		</FormGroup>
		<FormGroup>
			<Button type="submit" disabled={loading}>Sign in</Button>
		</FormGroup>
	</form>

	<p>
		Don't have an account? <a href="/signup">Sign up</a>
	</p>
</Tile>
