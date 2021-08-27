class Tree {
	#children = new Map();
	#parent = null;
	#id = Math.floor(Math.random() * Date.now());
	#name;

	constructor(name) {
		if (!name || typeof name !== 'string' || !name.trim().length) {
			throw new Error('Name must be a non-empty String');
		}

		this.#name = name;
	}

	get name() {
		return this.#name;
	}

	set name(newName) {
		if (!newName || typeof newName !== 'string' || !newName.trim().length) {
			throw new Error('Name must be a non-empty String');
		}

		this.#name = newName;
	}

	get identifier() {
		return this.#id;
	}

	get children() {
		return Array.from(this.#children.values());
	}

	get parentNode() {
		return this.#parent;
	}

	set parentNode(newParent) {
		if (
			newParent !== this.parentNode &&
			(newParent === null || newParent instanceof Tree)
		) {
			if (this.#parent) {
				this.#parent.removeChildNode(this);
			}

			this.#parent = newParent;

			if (newParent) {
				newParent.appendChildNode(this);
			}
		}
	}

	get ancestors() {
		let ancestors = [];
		if (this.parentNode === null) return;
		let parent = this.parentNode;
		ancestors.push(parent);

		while (parent !== null) {
			parent = parent.parentNode;
			ancestors.push(parent);
		}

		return ancestors;
	}

	get descendats() {
		let descendats = [];
		this.traverse((node) => descendats.push(node));
		return descendats;
	}

	get childrenCount() {
		return this.#children.size;
	}

	createChildNode(name) {
		const newNode = new Tree(name);
		this.#children.set(newNode.identifier, newNode);
		newNode.parentNode = this;

		return newNode;
	}

	hasChildNode(needle) {
		if (needle instanceof Tree) {
			return this.#children.has(needle.identifier);
		}

		for (let child of this.children) {
			if (child.name === needle || this.identifier === needle) {
				return true;
			}
		}

		return false;
	}

	getChildNode(nameOrId) {
		for (let child of this.children) {
			if (nameOrId === child.name || nameOrId === child.identifier) {
				return child;
			}
		}

		return null;
	}

	removeChildNode(needle) {
		if (!this.hasChildNode(needle)) return;

		let removedNode;

		if (needle instanceof Tree) {
			removedNode = needle;
			this.#children.delete(needle.identifier);
		} else {
			for (let child of this.children) {
				if (child.name === needle || child.identifier === needle) {
					this.#children.delete(needle);
					removedNode = child;
					break;
				}
			}
		}

		if (removedNode) {
			removedNode.parentNode = null;
		}
	}

	appendChildNode(node) {
		if (!(node instanceof Tree) || this.hasChildNode(node)) return;

		if (node === this) throw new Error('Node cannot contain itself');

		let parent = this.parentNode;
		while (parent !== null) {
			if (parent === node)
				throw new Error('Node cannot contain one of its ancestors');
			parent = parent.parentNode;
		}

		this.#children.set(node.identifier, node);
		node.parentNode = this;
	}

	#getTreeString = (node, spaceCount = 0) => {
		let str = '\n';

		node.children.forEach((child) => {
			str += `${' '.repeat(spaceCount)}${child.name}${this.#getTreeString(
				child,
				spaceCount + 2
			)}`;
		});

		return str;
	};

	print() {
		console.log(`\n${this.name}${this.#getTreeString(this, 2)}`);
	}

	traverse(callback) {
		for (let child of this.children) {
			if (callback(child) === true || child.traverse(callback) === true) {
				return true;
			}
		}
	}

	findNodeByName(name) {
		let foundNode = null;

		this.traverse((node) => {
			if (node.name === name) {
				foundNode = node;
				return true;
			}
		});

		return foundNode;
	}

	findAllNodeByName(name) {
		const children = [];

		this.traverse((node) => {
			if (node.name === name) {
				children.push(node);
			}
		});

		return children;
	}
}

export default Tree;
