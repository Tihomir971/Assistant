<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		Content,
		Header,
		HeaderNav,
		HeaderNavItem,
		SkipToContent
	} from 'carbon-components-svelte';

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
</script>

<svelte:head>
	<title>Email and Password Demo - Supabase Auth Helpers</title>
</svelte:head>
<Header company="Kalisi" platformName="Assistant">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		<HeaderNavItem href="/catalog" text="Products" />
		<HeaderNavItem href="/" text="Link 2" />
		<HeaderNavItem href="/" text="Link 3" />
	</HeaderNav>
	<a class="my-2" href="/">Supabase Auth Helpers Demo</a>
	<div class="navbar-end">
		{#if $page.data.session}
			<form action="/logout" method="post" use:enhance={handleLogout}>
				<button disabled={loading} type="submit">Sign out</button>
			</form>
		{/if}
	</div>
</Header>
<Content>
	<slot />
</Content>
