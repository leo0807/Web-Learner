function Queue() {
    this.items = []

    Queue.prototype.enqueue = function (element) {
        this.items.push(element);
    }

    Queue.prototype.delete = function () {
        return this.items.shift()
    }
    Queue.prototype.front = function () {
        return this.items[0]
    }
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    }
    Queue.prototype.size = function () {
        return this.items.length
    }
    Queue.prototype.toString = function () {
        var resString = '';
        for (var i = 0; i < this.items.length; i++){
            resString += this.items[i]
        }
        return resString;
    }
}

var queue = new Queue()