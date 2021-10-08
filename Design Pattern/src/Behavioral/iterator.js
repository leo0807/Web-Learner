/**
 * 提供一种方法以一种顺序的方式聚合各个元素，而又不暴露对该对象的内部表示
 * 虽然JS有for of， for in等多种循环方式，但是当循环的对象或者顺序比较复杂的时候，则需要使用迭代器模式协助循环，
 * 如next，hasNext等function
 * 
 * 使用场景
 * 1. Array.prototype.forEach
 * 2. ES6 iterator
 * 3. JQuery中的$.each()
 * 4. 访问一个聚合的对象而无需暴露它的内部表示
 * 5. 为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作
 */
// E.g.1
class Iterator {
    constructor(container) {
        this.list = container.list;
        this.index = 0;
    }
    next() {
        if (this.hasNext()) {
            return this.list[this.index++];
        }
        return null;
    }
    hasNext() {
        if (this.index >= this.list.length) {
            return false;
        }
        return true;
    }
}
class Container {
    constructor(list) {
        this.list = list;
    }
    // Generate Iterator
    getIterator() {
        console.log(this);
        return new Iterator(this);
    }
}
var arr = [1, 2, 3, 4];
const container = new Container(arr);
const iterator = container.getIterator();
while (iterator.hasNext()) {
    console.log(iterator.next());
}

function each(data) {
    let iterator = data[Symbol, iterator]();

    let item = { done: false };
    while (!item.done) {
        item = iterator.next();
        if (!item.done) {
            console.log(item.value);
        }
    }
}
// E.g.2
class Iterator {
    constructor(elements) {
        this.index = 0;
        this.elements = elements;
    }
    next() {
        return this.elements[this.index++];
    }
    hasNext() {
        return this.index <= this.elements.length;
    }
    first() {
        this.index = 0;
        return this.next()
    }
}
const items = ['Y', 'R', 'B'];
const iter = new Iterator(items);
for (let i = iter.first(); iter.hasNext(); i = iter.next()) {
    console.log(i);
}
// E.g.3
class ReverseIterator {
    //define-your-reverse-iterator-here
    constructor(items) {
        this.items = items;
        this.keys = Object.keys(items);
        this.index = this.keys.length - 1;
    }
    hasprevElement() {
        return this.index >= 0;
    }
    last() {
        this.index = this.keys.length - 1
        return this.items[this.keys[this.index]];
    }
    previous() {
        if (this.index >= 0) {
            return this.items[this.keys[--this.index]];
        } else {
            return null;
        }
    }
}


function reverseIterate(items) {
    const iter = new ReverseIterator(items);
    for (let i = iter.last(); iter.hasprevElement(); i = iter.previous()) {
        console.log(i);
    }
}