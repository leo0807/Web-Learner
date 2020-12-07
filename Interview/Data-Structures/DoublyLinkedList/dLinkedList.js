function DLinkedList() {
    function Node(data) {
        this.data = data;
        this.next = null;
    } 

    // 属性
    this.head = null;
    this.tail = null;
    this.length = 0;

    // Append
    DLinkedList.prototype.append = function (data) {
        // 创建新的节点
        var newNode = new Node(data);
        if (this.length === 0) {
            // 如果是第一个节点
            this.head = newNode;
            this.tail = newNode;
        } else {
            // 如果不是第一个节点
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        // 长度改变
        this.length++;
    }

    DLinkedList.prototype.toString = function () {
        return this.backwardString();
    }

    // forwardString
    DLinkedList.prototype.forwardString = function () {
        var current = this.tail;
        var resultString = "";
        while (current) {
            resultString += current.data + " ";
            current = current.prev;
        }
        return resultString;
    }
    // backwardString
    DLinkedList.prototype.backwardString = function () {
        var current = this.head;
        var resultString = "";

        while (current) {
            resultString += current.data + " ";
            current = current.next;
        }
        return resultString;
    }

    DLinkedList.prototype.insert = function (position, data) {
        // 越界判断
        if (position < 0 || position > this.length) return false;
        var newNode = new Node(data);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else if(position === this.length){
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            var current = this.head;
            var index = 0;
            while (index++ < position) {
                current = current.next;
            }
            // 修改四个指针
            newNode.next = current;
            newNode.prev = current.prev;
            current.prev.next = newNode;
            current.prev = newNode;
        }
        this.length++;
    }

    DLinkedList.prototype.get = function (position) {
        if (position < 0 || position >= this.length) return false;

        var current = this.head;
        var index = 0;
        while (index++ < position) {
            current = current.next;
        }
        return current.data;
    }

    DLinkedList.prototype.indexOf = function (element) {
        var current = this.head;
        var index = 0;
        while (current) {
            if (current.data === element) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    DLinkedList.prototype.update = function (position, element) {
        if (position < 0 || position >= this.length) return false;
        var index = 0;
        var current = this.head;
        while (index++ < position) {
            current = current.next;
        }
        current.data = element;
        return true;
    }

    DLinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) return false;

        var current = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            // 删除第一个节点
            if (position === 0) {
                this.head.next.prev = null;
                this.head = this.head.next;
            } else if (position === this.length - 1) {
                this.tail.prev.next = null;
                this.tail = this.tail.prev;
            } else {
                var index = 0;
                while (index++ < position) {
                    current = current.next;
                }
                current.prev.next = current.next;
                current.next.prev = current.prev
            }
        }
        this.length--;
        return current.data;
    }

    DLinkedList.prototype.remove = function (element) {
        return this.removeAt(this.indexOf(element));
    }

    DLinkedList.prototype.isEmpty = function () {
        return this.length === 0;
    }

    DLinkedList.prototype.size = function () {
        return this.length;
    }
    // 获取链表的第一个元素和最后一个元素
    DLinkedList.prototype.headData = function () {
        return this.head.data;
    }
    DLinkedList.prototype.tailData = function () {
        return this.tail.data;
    }
}