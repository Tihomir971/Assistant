<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		Header,
		HeaderAction,
		HeaderNav,
		HeaderNavItem,
		HeaderPanelDivider,
		HeaderPanelLink,
		HeaderPanelLinks,
		HeaderUtilities,
		SkipToContent
	} from 'carbon-components-svelte';
	import { UserAvatar } from 'carbon-icons-svelte';

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

<Header company="Kalisi" platformName="Assistant">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		<HeaderNavItem href="/catalog" text="Products" />
		<HeaderNavItem href="/catalog/report/pricing" text="Pricing" />
		<HeaderNavItem href="/" text="Link 3" />
		{#if $page.data.session}
			<form action="/logout" method="post" use:enhance={handleLogout}>
				<button disabled={loading} type="submit">Sign out</button>
			</form>
		{/if}
	</HeaderNav>
	<HeaderUtilities>
		<HeaderAction icon={UserAvatar}>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
				<li class="bx--switcher__item">
					{#if $page.data.session}
						<form action="/logout" method="post">
							<input class="bx--switcher__item-link" value="Logout" type="submit" />
						</form>
					{/if}
				</li>
				<HeaderPanelLink>Switcher item 1</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 2</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 3</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 4</HeaderPanelLink>
				<HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
				<HeaderPanelLink>Switcher item 1</HeaderPanelLink>
				<HeaderPanelLink>Switcher item 2</HeaderPanelLink>
				<HeaderPanelDivider>Switcher subject 3</HeaderPanelDivider>
				<HeaderPanelLink>Switcher item 1</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>
