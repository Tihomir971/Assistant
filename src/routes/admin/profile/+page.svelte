<script lang="ts">
	import { enhance } from '$app/forms';
	import Avatar from '$lib/components/Avatar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { session, supabase, profile } = data;

	let profileForm: any;
	let loading = false;
	let name: string | null | undefined = profile?.name;
	let avatar_url: string | null = profile?.avatar_url === undefined ? null : profile?.avatar_url;

	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}
</script>

<form
	class="form-widget"
	method="post"
	action="?/update"
	use:enhance={handleSubmit}
	bind:this={profileForm}
>
	<div>
		<label for="email">Email</label>
		<input id="email" type="text" value={session?.user.email} disabled />
	</div>
	<div>
		<label for="fullName">Full Name</label>
		<!-- <input id="fullName" name="fullName" type="text" value={form?.name ?? name} /> -->
		<input id="fullName" name="fullName" type="text" value={name} />
	</div>
</form>
<form method="post" action="/auth?/signout" use:enhance={handleSubmit}>
	<div>
		<button class="button block" disabled={loading}>Sign Out</button>
	</div>
</form>

<Avatar
	{supabase}
	bind:url={avatar_url}
	size={10}
	on:upload={() => {
		profileForm.requestSubmit();
	}}
/>
