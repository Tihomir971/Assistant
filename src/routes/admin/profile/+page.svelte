<script lang="ts">
	import { enhance } from '$app/forms';
	import { FormGroup, TextInput, Tile } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import ProductGallery from '$lib/components/ProductGallery.svelte';

	export let data: PageData;
	let { session, supabase, profile } = data;

	let profileForm: any;
	let loading = false;
	let name: string | null | undefined = profile?.name;
	let url: string[] | undefined = profile?.avatar_url?.split(';');
	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}
</script>

<Tile style="width: 480px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<FormGroup>
			<TextInput labelText="Email" type="text" value={session?.user.email} inline readonly />
		</FormGroup>
		<FormGroup>
			<TextInput
				id="fullName"
				name="fullName"
				labelText="Full Name"
				type="text"
				value={name}
				inline
			/>
			<!-- <input id="fullName" name="fullName" type="text" value={form?.name ?? name} /> -->
		</FormGroup>
	</form>
	<form method="post" action="/auth?/signout" use:enhance={handleSubmit}>
		<div>
			<button class="button block" disabled={loading}>Sign Out</button>
		</div>
	</form>
	<ProductGallery
		{supabase}
		bind:url
		bucket="avatars"
		size={10}
		on:upload={() => {
			//profileForm.requestSubmit();
		}}
	/>
	<!-- 	<Avatar
		{supabase}
		bind:url={avatar_url}
		size={10}
		on:upload={() => {
			profileForm.requestSubmit();
		}}
	/> -->
</Tile>
