<script lang="ts">
	import UpdateNow from 'carbon-icons-svelte/lib/UpdateNow.svelte';
	import type {
		DataTableHeader,
		DataTableRow
	} from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { DataTable, OverflowMenu, OverflowMenuItem, Truncate } from 'carbon-components-svelte';
	export let headers: DataTableHeader[];
	export let rows: DataTableRow[];

	$: headers.push({ key: 'menu', empty: true });
</script>

<DataTable
	size="short"
	sortable
	style="padding: 0px; overflow: auto; height: 100%; max-width: 100%;"
	{headers}
	{rows}
	{...$$restProps}
>
	<slot />

	<svelte:fragment slot="cell" let:cell let:row>
		{#if row[cell.key] === null}
			<span />
			<!-- {:else if cell.key.includes('price') || cell.key.includes('qty')} -->
		{:else if typeof cell.value === 'number'}
			<div style="text-align:right">
				{new Intl.NumberFormat('sr-Latn-RS', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				}).format(cell.value)}
			</div>
		{:else if cell.key === 'updated' || cell.key === 'created'}
			<span
				>{new Intl.DateTimeFormat('sr-Latn', {
					dateStyle: 'medium',
					timeStyle: 'medium'
				}).format(new Date(cell.value))}</span
			>
		{:else if cell.key === 'name'}
			<span>{cell.value}</span>
		{:else if cell.key.includes('url')}
			<a target="_blank" href={cell.value}><code>{cell.value}</code></a>
		{:else if cell.key === 'menu'}
			<OverflowMenu flipped>
				<OverflowMenuItem
					on:click={() => {
						dispatch('stock', row.id);
					}}
					>Stock
				</OverflowMenuItem>
				<OverflowMenuItem
					on:click={() => {
						dispatch('price', row.id);
					}}
					>Prices
				</OverflowMenuItem>
				<OverflowMenuItem
					on:click={() => {
						dispatch('replenish', row.id);
					}}
					>Replenish
				</OverflowMenuItem>
				<OverflowMenuItem
					on:click={() => {
						dispatch('edit', row.id);
					}}
					>Edit
				</OverflowMenuItem>
				<OverflowMenuItem
					danger
					on:click={() => {
						dispatch('delete', row.id);
					}}
				>
					Delete
				</OverflowMenuItem>
			</OverflowMenu>
		{:else}
			<div style="text-align:right">
				{cell.value}
			</div>
		{/if}
	</svelte:fragment>
</DataTable>
