<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import {
		Button,
		Column,
		Content,
		FormGroup,
		Grid,
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

<Content class="center-content">
	<Tile style="width: 375px">
		<FormGroup>
			<h2>Sign in</h2>
		</FormGroup>
		{#if form?.error}
			<div class="block notification is-danger">{form.error}</div>
		{/if}
		<form method="post" use:enhance={handleSubmit}>
			<FormGroup>
				<TextInput
					id="email"
					name="email"
					autocomplete="username"
					value={form?.values?.email ?? ''}
					labelText="Email"
					placeholder="Enter email..."
					required
				/>
			</FormGroup>
			<!-- <div class="field">
								<label for="email" class="label">Email</label>
								<p class="control">
									<input
										id="email"
										name="email"
										value={form?.values?.email ?? ''}
										class="input"
										type="email"
										placeholder="Email"
										required
									/>
								</p>
							</div> -->
			<FormGroup>
				<PasswordInput
					id="password"
					name="password"
					autocomplete="current-password"
					labelText="Password"
					placeholder="Enter password..."
					required
				/>
			</FormGroup>
			<!-- <div class="field">
								<label for="password" class="label">Password</label>
								<p class="control">
									<input
										id="password"
										name="password"
										class="input"
										type="password"
										placeholder="Password"
										required
									/>
								</p>
							</div> -->
			<FormGroup>
				<Button type="submit" disabled={loading}>Sign in</Button>
			</FormGroup>
		</form>

		<p>
			Don't have an account? <a href="/signup">Sign up</a>
		</p>
	</Tile>
</Content>
