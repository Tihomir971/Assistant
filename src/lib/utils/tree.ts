interface TreeNode {
	id: string | number;
	text: string;
	icon?: typeof import('svelte').SvelteComponent;
	disabled?: boolean;
	expanded?: boolean;
	parent_id?: number | null;
	children?: TreeNode[];
}

interface DataTableRow {
	id: number;
	text: string;
	parent_id: number | null;
	children?: TreeNode[];
}
//array: T[], property: keyof T
function removeProperty(items: TreeNode[], property: keyof TreeNode) {
	//for (const item of items) {
	//	delete item.parentId;
	//	if (item.children) {
	//		removeProperty(item.children);
	//	}
	//}
	items.forEach((item) => {
		delete item[property];
		if (item.children) {
			removeProperty(item.children, property);
		}
	});
}

function createTree(data: Array<DataTableRow>): TreeNode[] {
	//Add empty children
	data.forEach((item) => {
		item.children = [id: "1",text:"test"];
	});
	console.log('addchildren', data);

	//Create tree structure
	const tree: Array<TreeNode> = [];

	data.forEach((item) => {
		if (!item.parent_id) {
			tree.push(item);
		} else {
			const parent = data.find((parent) => parent.id === item.parent_id);
			if (parent && parent.children) {
				parent.children.push(item);
			}
		}
	});
	const removeEmptyChildren = (tree: Array<TreeNode>) => {
		tree.forEach((obj) => {
			if (obj.children && obj.children.length === 0) {
				delete obj.children;
			}
			if (obj.children) {
				removeEmptyChildren(obj.children);
			}
		});
	};
	removeEmptyChildren(tree);
	removeProperty(tree, 'parent_id');
	return tree;
}

export function convertToTreeStructure(data: Array<DataTableRow> | null): TreeNode[] | undefined {
	if (!data) return;
	return createTree(data);
}
