<script lang="ts">
	import { DataTable, TextInput } from 'carbon-components-svelte';
	import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	let rows: ReadonlyArray<DataTableRow> = [
		{ id: 0, x: 123, y: 345 },
		{ id: 1, x: 124, y: 346 },
		{ id: 2, x: 125, y: 347 }
	];
</script>

<DataTable
	headers={[
		{ key: 'x', value: 'X' },
		{ key: 'y', value: 'Y' }
	]}
	{rows}
	sortable
>
	<span slot="cell" let:row let:cell style="width:100%; display:inline-block; cursor:pointer">
		<!-- <input type="text" bind:value={rows[row.id][cell.key]} /> -->
		<TextInput bind:value={rows[row.id][cell.key]} />
	</span>
</DataTable>
