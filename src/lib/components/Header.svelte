<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
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
		SkipToContent
	} from 'carbon-components-svelte';
	import { Email, Login, UserAvatar } from 'carbon-icons-svelte';

	let selectedWarehouseId = $page.url.searchParams.get('wh') || '5';

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
	function submitForm() {
		const form = document.getElementById('SignOut-Form') as HTMLFormElement;
		form.submit();
	}

	const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`);
	};
</script>

<Header company="Kalisi" platformName="Assistant" href="/">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		{#if $page.data.session}
			<HeaderNavItem
				href="/catalog?wh={selectedWarehouseId}"
				text="Products"
				isSelected={$page.url.pathname === '/catalog'}
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
						updateSearchParams('wh', selectedWarehouseId);
					}
				}}
			/>
			<HeaderGlobalAction aria-label="Settings" icon={Email} />
			<HeaderAction icon={UserAvatar}>
				<HeaderPanelLinks>
					<HeaderPanelDivider>Account</HeaderPanelDivider>
					<HeaderPanelLink href="/admin/profile">My Account</HeaderPanelLink>
					<HeaderPanelDivider />
					<form id="SignOut-Form" action="/auth?/signout" method="POST" use:enhance={handleLogout}>
						<HeaderPanelLink on:click={submitForm}>Sign out</HeaderPanelLink>
					</form>
				</HeaderPanelLinks>
			</HeaderAction>
		{:else}
			<HeaderGlobalAction icon={Login} on:click={() => goto('/auth')} />
		{/if}
	</HeaderUtilities>
</Header>
