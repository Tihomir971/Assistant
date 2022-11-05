<script lang="ts">
	import { page } from '$app/stores';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';

	import Sun from 'carbon-icons-svelte/lib/Sun.svelte';
	import Moon from 'carbon-icons-svelte/lib/Moon.svelte';
	import User from 'carbon-icons-svelte/lib/User.svelte';
	import {
		Button,
		Header,
		HeaderAction,
		HeaderGlobalAction,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		HeaderPanelDivider,
		HeaderPanelLink,
		HeaderPanelLinks,
		HeaderUtilities,
		Link,
		SkipToContent
	} from 'carbon-components-svelte';

	export let theme: string = 'g100';
	function switchTheme() {
		theme == 'g10' ? (theme = 'g100') : (theme = 'g10');
	}

	const handleLogout: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
		};
	};
</script>

<Header company="KALISI" platformName="Assistant" href="/dashboard">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		<HeaderNavMenu text="Catalog">
			<HeaderNavItem
				text="Products"
				href="/catalog/products"
				isSelected={$page.url.pathname === '/catalog/products'}
			/>
			<HeaderNavItem
				text="Attributes"
				href="/catalog/attributes"
				isSelected={$page.url.pathname === '/catalog/attributes'}
			/>
			<HeaderNavItem text="Products" href="/catalog/products" />
			<HeaderNavItem text="Products" href="/catalog/products" />
		</HeaderNavMenu>
	</HeaderNav>
	<HeaderUtilities>
		<HeaderGlobalAction
			aria-label="Theme"
			icon={theme == 'g10' ? Sun : Moon}
			on:click={switchTheme}
		/>
		<HeaderAction icon={User} closeIcon={User}>
			<HeaderPanelLinks>
				<HeaderPanelLink>User profile</HeaderPanelLink>
				<HeaderPanelDivider />
				<li class="bx--switcher__item">
					{#if $page.data.session}
						<form action="/logout" method="post" use:enhance={handleLogout}>
							<input class="bx--switcher__item-link" value="Logout" type="submit" />
						</form>
					{/if}
				</li>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>

<style>
	input {
		width: 100%;
		text-align: left;
		background-color: unset;
		border: none;
	}
</style>
