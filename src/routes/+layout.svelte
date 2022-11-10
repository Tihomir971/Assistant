<script lang="ts">
	// import type { CarbonTheme } from 'carbon-components-svelte/types/Theme/Theme.svelte';

	// import { Theme } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/g100.css';
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	/* let theme: CarbonTheme = 'g100'; */

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<!-- <Theme bind:theme persist> -->
<slot />

<!-- </Theme> -->
<style>
	:global(.center-content) {
		min-height: calc(100vh - 3rem);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	:global(.bx--form-item) {
		padding-bottom: 1rem;
	}
	:global(.bx--toggle-input__label .bx--toggle__switch) {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
</style>
