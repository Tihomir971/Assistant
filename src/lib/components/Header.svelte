<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	//import { warehouseId } from '$lib/stores/settingStore';
	import {
		Dropdown,
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
		Select,
		SelectItem,
		SkipToContent
	} from 'carbon-components-svelte';
	import { Email, Login, UserAvatar } from 'carbon-icons-svelte';

	//export let warehouseItems

	let selected: string | number | undefined;
	let selectedWarehouseId = $page.url.searchParams.get('wh');

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
	function handleClick() {
		const form = document.getElementById('my-form') as HTMLFormElement;
		form.submit();
	}
</script>

<Header company="Kalisi" platformName="Assistant" href="/">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		{#if $page.data.session}
			<HeaderNavItem
				href="/catalog"
				text="Products"
				isSelected={$page.url.pathname === '/catalog'}
			/>
			<HeaderNavItem
				href="/catalog/report/pricing"
				text="Pricing"
				isSelected={$page.url.pathname === '/catalog/report/pricing'}
			/>
			<HeaderNavItem
				href="/catalog/report/replenish"
				text="Replenish"
				isSelected={$page.url.pathname === '/catalog/report/replenish'}
			/>
			<HeaderNavMenu text="Admin">
				<HeaderNavItem
					text="Users"
					href="/admin/profile"
					isSelected={$page.url.pathname === '/admin/profile'}
				/>
			</HeaderNavMenu>
		{/if}
	</HeaderNav>
	<HeaderUtilities>
		{#if $page.data.session}
			<Dropdown
				style="column-gap: 0rem"
				type="inline"
				bind:selectedId={selectedWarehouseId}
				label="Select Warehouse"
				titleText="Warehouse:"
				items={[
					{ id: '5', text: 'Retail' },
					{ id: '2', text: 'Wholesale' },
					{ id: '6', text: 'Service' }
				]}
				on:select={() => {
					if (selectedWarehouseId) {
						const newUrl = new URL($page.url);
						newUrl.searchParams.set('wh', selectedWarehouseId);
						goto(newUrl.href);
					}
				}}
			/>
			<HeaderGlobalAction aria-label="Settings" icon={Email} />
			<HeaderAction icon={UserAvatar}>
				<HeaderPanelLinks>
					<HeaderPanelDivider>Account</HeaderPanelDivider>
					<HeaderPanelLink href="/admin/profile">My Account</HeaderPanelLink>
					<HeaderPanelDivider />
					<form id="my-form" action="/auth?/signout" method="POST" use:enhance={handleLogout}>
						<HeaderPanelLink on:click={handleClick}>Sign out</HeaderPanelLink>
					</form>
				</HeaderPanelLinks>
			</HeaderAction>
		{:else}
			<HeaderGlobalAction icon={Login} on:click={() => goto('/auth')} />
		{/if}
	</HeaderUtilities>
</Header>
