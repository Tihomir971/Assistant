<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { warehouseId } from '$lib/stores/settingStore';
	import {
		Header,
		HeaderAction,
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
	import { UserAvatar } from 'carbon-icons-svelte';

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
		<Select
			noLabel
			bind:selected
			on:change={() => {
				warehouseId.set(Number(selected));
				invalidateAll();
			}}
		>
			<SelectItem value="5" text="Retail" />
			<SelectItem value="2" text="Wholesale" />
		</Select>
		<HeaderAction icon={UserAvatar}>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
				{#if $page.data.session}
					<form id="my-form" action="/logout" method="POST">
						<HeaderPanelLink on:click={handleClick}>Sign out</HeaderPanelLink>
					</form>
				{/if}
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
