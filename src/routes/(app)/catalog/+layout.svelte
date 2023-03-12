<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: ({ categoryTable, user } = data);
</script>

<div class="block">
	<p>Protected content for {user.email}</p>
	<p>server-side fetched data with RLS:</p>
	<pre>{JSON.stringify(categoryTable, null, 2)}</pre>
</div>
<slot>Layout</slot>
