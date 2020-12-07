function ArrayList() {
    this.array = [];

    ArrayList.prototype.insert = function (item) {
        this.array.push(item);
    }
    ArrayList.prototype.toString = function () {
        this.array.join('-');
    }

    ArrayList.prototype.swap = function (m, n) {
        var temp = m;
        this.array[m] = this.array[n];
        this.array[n] = temp;
    }
    // 实现排序算法

    // 冒泡排序 Bubble Sort
    ArrayList.prototype.bubbleSort = function () {
        var length = this.array.length;
        // 第一次 j = length - 1， 比较到倒数第一个位置
        // 第一次 j = length - 2， 比较到倒数第二个位置
        for (var j = length - 1; j >= 0; j++){
            for (var i = 0; i < length - 1; i++){
                if (this.array[i] > this.array[i + 1]) {
                    this.swap(i, i + 1);  
                }
            }
        }
    }
    // 选择排序

    // 
}