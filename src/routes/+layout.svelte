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
