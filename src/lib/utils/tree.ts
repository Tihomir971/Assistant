/* interface TreeNode {
	id: string | number;
	text: string;
	icon?: typeof import('svelte').SvelteComponent;
	disabled?: boolean;
	expanded?: boolean;
	parent_id?: number | null;
	children?: TreeNode[];
} */

import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
import type { TreeNode } from 'carbon-components-svelte/types/TreeView/TreeView.svelte';

/* interface DataTableRow {
	id: number;
	text: string;
	parent_id: number | null;
	children?: TreeNode[];
} */

function arrayToTree(items: Array<DataTableRow>) {
	const itemMap = new Map();

	// Initialize the map with all items
	items.forEach((item) => {
		itemMap.set(item.id, { ...item });
	});

	// Create the tree structure
	const result: Array<TreeNode> = [];
	items.forEach((item) => {
		if (item.parent_id === null) {
			const newItem = itemMap.get(item.id);
			if (itemMap.get(item.id).children) {
				newItem.children = itemMap.get(item.id).children;
			}
			result.push(newItem);
		} else {
			const parent = itemMap.get(item.parent_id);
			if (parent) {
				parent.children = parent.children || [];
				parent.children.push(itemMap.get(item.id));
			}
		}
	});

	// Remove parent_id from all items
	items.forEach((item) => {
		const mappedItem = itemMap.get(item.id);
		if ('parent_id' in mappedItem) {
			delete mappedItem.parent_id;
		}
	});

	// Add "Unclassified" node at the end
	result.push({ id: 0, text: 'Unclassified' });

	return result;
}
export function convertToTreeStructure(data: Array<DataTableRow> | null): TreeNode[] | undefined {
	if (!data) return;
	//return createTree(data);
	return arrayToTree(data);
}
