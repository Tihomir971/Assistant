<script lang="ts">
	import { warehouseId } from '$lib/stores/settingStore';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ user } = data);
</script>

<div class="block">
	{$warehouseId}
	<p>user:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</div>
