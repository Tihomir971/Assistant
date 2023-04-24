<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import Toast from '../lib/components/toast/Toast.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import 'carbon-components-svelte/css/g90.css';
	import { Content } from 'carbon-components-svelte';
	import Header from '$lib/components/Header.svelte';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Kalisi Assistant</title>
</svelte:head>

<Header />
<Content style="padding: 0px; height: calc(100vh - 3rem);">
	<Toast />
	<slot />
</Content>

<style>
	/* :global(.bx--content) { */
	/* background-image: url('/sun-tornado.svg'); */
	/* background-size: cover; */
	/* margin-left: 3rem; */
	/* padding: 0rem; */

	/* min-height: calc(100vh - 3rem); */
	/* } */
	:global(.bx--label) {
		font-size: 0.875rem;
	}
	:global(.bx--fieldset) {
		margin-bottom: 1rem;
	}
</style>
