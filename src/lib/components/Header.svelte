<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	//import { warehouseId } from '$lib/stores/settingStore';
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
		<HeaderAction icon={UserAvatar}>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
				{#if $page.data.session}
					<form id="my-form" action="/logout" method="POST" use:enhance={handleLogout}>
						<HeaderPanelLink on:click={handleClick}>Sign out</HeaderPanelLink>
					</form>
				{/if}
				<HeaderPanelLink>Switcher item 1</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>
