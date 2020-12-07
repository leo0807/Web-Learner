function LinkedList() {
    // Node Class
    function Node(data) {
        this.data = data;
        this.next = null;
    }

    // Property
    this.head = null;
    this.length = 0;

    // Methods
    LinkedList.prototype.append = function (data) {
        // Whther this is the first node
        if (this.length === 0) {
            // if it is the first node
            var newNode = new Node(data);
            this.head = newNode;
        } else {
            // otherwise
            var newNode = new Node(data);

            var current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        // Add Length
        this.length++;
    }

    // toString Method
    LinkedList.prototype.toString = function () {
        // Define Variable
        var current = this.head;
        var listString = '';
        // Get all the nodes through iteration
        while (current) {
            listString += current.next + '';
            current = current.next;
        }
        return listString;
    }

    LinkedList.prototyp.insert = function (position, data) {
        if (position < 0 || position > this.length) return false;

        var newNode = new Node(data);

        if (position === 0) {
            newNode.next = this.head;
        } else {
            var index = 0;
            var current = this.head;
            var previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            newNode.next = current;
            previous.next = newNode;
        }
        this.length++;
        return true;
    }

    LinkedList.prototype.get = function (position) {
        if (position < 0 || position > this.length) return false;

        var current = this.head;
        var index = 0;
        while (index++ < position) {
            current = current.next;

        }
        return current.data
    }

    LinkedList.prototype.indexOf = function (data) {
        var current = this.head;
        var index = 0;

        while (current) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    LinkedList.prototype.update = function (position, element) {
        if (position < 0 || position > this.length) return false;

        var current = this.head;
        var index = 0;

        while (index++ < position) {
            current = current.next
        }
        current.data = element
        return true;
    }

    LinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position > this.length) return false;
        
        var current = this.head;
        if (position === 0) {
            this.head = this.head.next;
        } else {
            var index = 0;
            var previous = null;
            
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.length--;
        return current.data;
    }

    LinkedList.prototype.remove = function (data) {
        var position = this.indexOf(data);
        return this.removeAt(position);
    }

    LinkedList.prototype.isEmpty = function () {
        return this.length === 0;
    }
    LinkedList.prototype.size = function () {
        return this.length;
    }
}