<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	//import { warehouseId } from '$lib/stores/settingStore';
	import {
		Header,
		HeaderAction,
		HeaderGlobalAction,
		HeaderNav,
		HeaderNavItem,
		HeaderPanelDivider,
		HeaderPanelLink,
		HeaderPanelLinks,
		HeaderUtilities,
		Select,
		SelectItem,
		SkipToContent
	} from 'carbon-components-svelte';
	import { Email, UserAvatar } from 'carbon-icons-svelte';

	let selected: string | number | undefined;

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
		<HeaderNavItem href="/catalog" text="Products" isSelected={$page.url.pathname === '/catalog'} />
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
	</HeaderNav>
	<HeaderUtilities>
		<Select
			noLabel
			bind:selected
			on:change={() => {
				//	warehouseId.set(Number(selected));
				invalidateAll();
			}}
		>
			<SelectItem value="5" text="Retail" />
			<SelectItem value="2" text="Wholesale" />
		</Select>
		<HeaderGlobalAction aria-label="Settings" icon={Email} />
		<HeaderAction icon={UserAvatar}>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Account</HeaderPanelDivider>
				{#if $page.data.session}
					<form id="my-form" action="/logout" method="POST" use:enhance={handleLogout}>
						<HeaderPanelLink on:click={handleClick}>Sign out</HeaderPanelLink>
					</form>
				{/if}
				<HeaderPanelDivider>Warehouse</HeaderPanelDivider>
				<HeaderPanelLink>Retail</HeaderPanelLink>
				<HeaderPanelLink>Wholesale</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>
