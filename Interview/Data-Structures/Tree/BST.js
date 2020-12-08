function BinarySearchTree() {
    function Node(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
    this.root = null;
    BinarySearchTree.prototype.insert = function (key) {
        var newNode = new Node(key);

        if (this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    BinarySearchTree.prototype.insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    BinarySearchTree.prototype.preOrderTraversal = function (handler) {
        this.preOrderTraversalNode(this.root, handler);
    }

    BinarySearchTree.prototype.preOrderTraversalNode = function (node, hanler) {
        if (node !== null) {
            hanler(node.key);
            this.preOrderTraversalNode(node.left, hanler);
            this.preOrderTraversalNode(node.right, hanler);
        }
    }
    BinarySearchTree.prototype.middleOrderTraversal = function (handler) {
        this.middleOrderTraversalNode(this.root, handler);
    }

    BinarySearchTree.prototype.middleOrderTraversalNode = function (node, hanler) {
        if (node !== null) {
            this.middleOrderTraversalNode(node.left, hanler);
            hanler(node.key);
            this.middleOrderTraversalNode(node.right, hanler);
        }
    }
    BinarySearchTree.prototype.backOrderTrvaesal = function (handler) {
        this.backOrderTrvaesalNode(this.root, handler);
    }

    BinarySearchTree.prototype.backOrderTrvaesalNode = function (node, hanler) {
        if (node !== null) {
            this.backOrderTrvaesalNode(node.left, hanler);
            this.backOrderTrvaesalNode(node.right, hanler);
            hanler(node.key);
        }
    }

    BinarySearchTree.prototype.min = function () {
        // while (this.root.left) {
        //     this.root = this.root.left;
        // } 
        // return this.root.key;
        var node = this.root;
        var key = null;
        while (node !== null) {
            key = node.key;
            node = node.left;
        }
        return key;
    }
    BinarySearchTree.prototype.max = function () {
        var node = this.root;
        var key = null;
        while (node !== null) {
            key = node.key;
            node = node.right;
        }
        return key;
    }

    BinarySearchTree.prototype.serachTree = function (key) {
        var node = this.root;

        while (node !== null) {
            if (key > node.key) {
                node = node.right;
            } else if (key < node.key) {
                node = node.left;
            } else {
                return true;
            }
        }
        return false;
    }

    BinarySearchTree.prototype.remove = function (key) {
        var current = this.root;
        var parent = null;
        var isLeftChild = true;

        while (current.key !== key) {
            parent = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.left;
            } else {
                isLeftChild = false;
                current = current.right;
            }

            if (current === null) return false;
        }

        // 删除叶子节点
        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }
        // 删除节点有一个子节点
        else if (current.left === null) {
            if (current === this.root) {
                this.root = current.right;
            } else if (isLeftChild) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        }
        else if (current.right === null) {
            if (current === this.root) {
                this.root = current.left;
            } else if (isLeftChild) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        }
        // 删除节点有两个节点
        else {
            var successor = this.getSuccessor(current);
            // 判断时候是根节点
            if (current === this.root) {
                this.root = successor;
            } else if (isLeftChild) {
                parent.left = successor;
            } else {
                parent.right = successor
            }

            successor.left = current.left;
        }
    }
    // 寻找后继节点，左子树找最大值进行删除节点的替换。右子树找最小的节点值进行替换
    BinarySearchTree.prototype.getSuccessor = function (delNode) {

        var successor = delNode;
        var current = delNode.right;
        var successorParent = delNode;

        while (current !== null) {
            successorParent = successor;
            successor = current;
            current = current.left;
        }

        if (successor !== delNode.right) {
            successorParent.left = successor.right;
            successor.right = delNode.right;
        }
        return successor;
    }
}
var bst = new BinarySearchTree();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
console.log(bst);
var result = "";
bst.preOrderTraversal(function (key) {
    result += key + " ";
})

console.log(result);
console.log(bst.min());
console.log(bst.max());
var m = bst.serachTree(3);
var n = bst.serachTree(220);
console.log(m, n);