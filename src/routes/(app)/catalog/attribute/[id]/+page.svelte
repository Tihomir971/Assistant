<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ rows } = data);
	$: console.log(rows);
</script>
