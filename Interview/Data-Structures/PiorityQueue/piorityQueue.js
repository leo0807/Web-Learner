function PiorityQueue() {
    function QueueElement(element, piority) {
        this.element = element;
        this.prority = piority;
    }
    this.items = [];
    PiorityQueue.prototype.enqueue = function (element, piority) {
        var queueElement = new QueueElement(element, piority);
        // 判断队列是否为空
        if (this.items.length === 0) {
            this.items.push(element)
        } else {
            // 记录是否添加成功
            var added = false;
            for (var i = 0; i < this.items.length; i++){
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(queueElement);
        }
    }


    PiorityQueue.prototype.dequeue = function () {
        return this.items.shift()
    }
    PiorityQueue.prototype.front = function () {
        return this.items[0]
    }
    PiorityQueue.prototype.isEmpty = function () {
        return this.items.length === 0;
    }
    PiorityQueue.prototype.size = function () {
        return this.items.length
    }
    PiorityQueue.prototype.toString = function () {
        var resString = '';
        for (var i = 0; i < this.items.length; i++){
            resString += this.items[i]
        }
        return resString;
    }
}