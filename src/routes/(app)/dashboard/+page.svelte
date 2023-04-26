<script lang="ts">
	import { addToast } from '$lib/store/toasts';
	import { Button, Content } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ user } = data);
</script>

<Content>
	<div class="block">
		<p>user:</p>
		<pre>{JSON.stringify(user, null, 2)}</pre>
	</div>

	<Button
		type="button"
		on:click={() => addToast('Welcome!', 'Let’s make something great!', 'default')}
	>
		Trigger default
	</Button>
	<Button
		type="button"
		on:click={() => addToast('Welcome!', 'Let’s make something great!', 'brand')}
	>
		Trigger brand
	</Button>
	<Button
		type="button"
		on:click={() => addToast('Welcome!', 'Let’s make something great!', 'success')}
	>
		Trigger success
	</Button>
	<Button
		type="button"
		on:click={() => addToast('Welcome!', 'Let’s make something great!', 'warning')}
	>
		Trigger warning
	</Button>
	<Button
		type="button"
		on:click={() => addToast('Welcome!', 'Let’s make something great!', 'error')}
	>
		Trigger error
	</Button>
</Content>
