<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import { Content, Grid } from 'carbon-components-svelte';

	let loading = false;

	const handleLogout: SubmitFunction = () => {
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
	export let theme: string;
</script>

<svelte:head>
	<title>Email and Password Demo - Supabase Auth Helpers</title>
</svelte:head>

<Header bind:theme />

<Content>
	<Grid>
		<slot />
	</Grid>
</Content>
