<script lang="ts">
	import { addToast } from '$lib/store/toasts';
	import { Button } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ user } = data);
</script>

<div class="block">
	<p>user:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</div>

<Button
	type="button"
	on:click={() => addToast('Welcome!', 'Let’s make something great!', 'default')}
	class="mx-auto block rounded-md bg-neutral-600 py-2.5 px-3.5 text-sm font-normal text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
>
	Trigger default
</Button>
