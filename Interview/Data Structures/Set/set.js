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
}

const set = new Set();
set.add('123');
set.size()
set.values();
console.log(set);