function Set() {
    // 属性
    this.items = {}

    // 方法
    Set.prototype.add = function (value) {
        if (this.has(value)) return false;

        this.items[value] = value;
        return true;
    }

    Set.prototype.has = function (value) {
        return this.items.hasOwnProperty(value);
    }

    Set.prototype.remove = function (value) {
        // 判断是否包含该元素
        if (!this.has(value)) {
            return false;
        }
        delete this.items[value];
        return true;
    }
    Set.prototype.clear = function () {
        this.items = {}
    }
    Set.prototype.size = function () {
        return Object.keys(this.items).length;
    }
    Set.prototype.values = function () {
        return Object.keys(this.items);
    }

    // 集合间的操作
    // 并集 Union
    Set.prototype.union = function (otherSet) {
        var unionSet = new Set();
        // 取出集合A中所有元素
        var values = this.values();
        for (var i = 0; i < values.length; i++){
            unionSet.add(values[i]);
        }
        // 取出集合B中所有元素
        values = otherSet.values();
        for (var i = 0; i < values.length; i++){
            unionSet.add(values[i]);
        }
        return unionSet;
    }
    // 交集 intersection
    Set.prototype.intersection = function (otherSet) {
        var intersectionSet = new Set();
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            var item = values[i];
            if (otherSet.has(item)) {
                intersectionSet.add(item);
            }
        }
        return intersectionSet;
    }

    // 差集
    Set.prototype.difference = function (otherSet) {
        var differenceSet = new Set();
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            var item = values[i];
            if (!otherSet.has(item)) {
                differenceSet.add(item);
            }
        }
        return differenceSet;
    }

    Set.prototype.subSet = function (otherSet) {
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            var item = values[i];
            if (!otherSet.has(item)) {
                return false;
            }
        }
        return true;
    }

}

const set = new Set();
set.add('123');
set.size()
set.values();

const set2 = new Set();
set2.add('123');
set2.add('1234');
set2.add('ccc');
// let newSet = set.union(set2);
let newSet = set.intersection(set2);
console.log(newSet);