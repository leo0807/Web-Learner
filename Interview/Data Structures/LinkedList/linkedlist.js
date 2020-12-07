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
}