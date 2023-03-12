<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import 'carbon-components-svelte/css/g90.css';

	export let data: LayoutData;

	$: ({ supabase } = data);
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Kalisi Assistant</title>
</svelte:head>

<slot />
