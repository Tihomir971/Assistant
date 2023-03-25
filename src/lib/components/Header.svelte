<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Header, HeaderNav, HeaderNavItem, SkipToContent } from 'carbon-components-svelte';

	let loading = false;
</script>

<Header company="Kalisi" platformName="Assistant">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		<HeaderNavItem href="/catalog" text="Products" />
		<HeaderNavItem href="/catalog/report/pricing" text="Pricing" />
		<HeaderNavItem href="/" text="Link 3" />
	</HeaderNav>
</Header>
