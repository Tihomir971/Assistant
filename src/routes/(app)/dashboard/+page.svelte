<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ userTable, user } = data);
</script>

<p>Protected content for {user.email}</p>
<div class="block">
	<p>ad_user Table</p>
	<pre>{JSON.stringify(userTable, null, 2)}</pre>
</div>
<div class="block">
	<p>user:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</div>
