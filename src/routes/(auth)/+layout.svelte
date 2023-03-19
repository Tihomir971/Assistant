<script lang="ts">
	import { Content } from 'carbon-components-svelte';

	//	import type { LayoutData } from './$types';

	//	export let data: LayoutData;
</script>

<Content>
	<slot />
</Content>

<style>
	:global(.bx--content) {
		/* background-image: url('/sun-tornado.svg'); */
		/* background-size: cover; */
		min-height: calc(100vh - 3rem);
		/* margin-left: 3rem; */
		/* padding: 0rem; */
	}
</style>
