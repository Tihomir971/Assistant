type TreeNodeId = string | number;

interface TreeNode {
	id: string | number;
	text: string;
	icon?: typeof import('svelte').SvelteComponent;
	disabled?: boolean;
	expanded?: boolean;
	parent_id?: number | null;
	children?: TreeNode[];
}

// export function convertToTreeNodes(
export function convertToTreeStructure(
	data:
		| {
				id: number;
				parent_id: number | null;
				text: string;
		  }[]
		| null
): TreeNode[] {
	if (!data) {
		return [];
	}

	// Create a map of nodes keyed by their id
	const nodeMap = new Map<TreeNodeId, TreeNode>();
	data.forEach((item) => {
		const node: TreeNode = {
			id: item.id,
			text: item.text
		};
		nodeMap.set(item.id, node);
	});

	// Link parent nodes to child nodes
	data.forEach((item) => {
		const childNode = nodeMap.get(item.id);
		const parentNode = item.parent_id !== null ? nodeMap.get(item.parent_id) : undefined;
		if (childNode && parentNode) {
			parentNode.children = parentNode.children || [];
			parentNode.children.push(childNode);
		}
	});

	// Remove empty children arrays from each node
	Array.from(nodeMap.values()).forEach((node) => {
		if (node.children && node.children.length === 0) {
			delete node.children;
		}
	});

	// Find the root nodes (nodes without a parent) and return them as the result
	const rootNodes = Array.from(nodeMap.values()).filter((node) => {
		if (typeof node.id === 'number') {
			return !nodeMap.has(node.id);
		} else {
			return false;
		}
	});

	return rootNodes;
}
