<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import type {
		DataTableHeader,
		DataTableRow
	} from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import { DataTable } from 'carbon-components-svelte';

	export let session: Session | null;

	export let headers: ReadonlyArray<DataTableHeader>;
	export let rows: ReadonlyArray<DataTableRow>;
</script>

{#if !session}
	<h1>I am not logged in</h1>
{:else}
	<DataTable style="height: 100%" {headers} {rows} {...$$restProps} />
{/if}
