<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Column, Row } from 'carbon-components-svelte';
	export let nav: { href: string; text: string }[];
</script>

<Row>
	<Column>
		<Breadcrumb noTrailingSlash>
			{#each nav as item, i}
				<BreadcrumbItem href={item.href} isCurrentPage={i === nav.length - 1}>
					{item.text}
				</BreadcrumbItem>
			{/each}
		</Breadcrumb>
	</Column>
</Row>
