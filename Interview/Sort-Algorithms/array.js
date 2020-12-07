function ArrayList() {
    this.array = [];

    ArrayList.prototype.insert = function (item) {
        this.array.push(item);
    }
    ArrayList.prototype.toString = function () {
        return this.array.join('-');
    }

    ArrayList.prototype.swap = function (m, n) {
        var temp = this.array[m];
        this.array[m] = this.array[n];
        this.array[n] = temp;
    }
    // 实现排序算法

    // 冒泡排序 Bubble Sort
    ArrayList.prototype.bubbleSort = function () {
        var length = this.array.length;
        // 两两比较 每次最大的值放在最右边
        // 第一次 j = length - 1， 比较到倒数第一个位置
        // 第一次 j = length - 2， 比较到倒数第二个位置
        for (var j = length - 1; j >= 0; j--){
            for (var i = 0; i < length - 1; i++){
                if (this.array[i] > this.array[i + 1]) {
                    this.swap(i, i + 1);  
                }
            }
        }
        // 效率 N^2/2 - N/2 => O(n^2)
    }
    // 选择排序
    // 对冒泡排序进行优化 交换次数由O(n^2) 变成 O(n)
    // 但是比较的次数依然是O(n^2)
    // 方法 选择一个最小值和第一个索引位进行交换，此时第一个索引位置为最小值
    // 剩下的元素一次类推

    ArrayList.prototype.selectionSort = function () {
        var length = this.array.length;

        for (var j = 0; j < length - 1; j++){

            var min = j;
            // 从后一位开始， 从0位置开始取数据
            for (var i = min + 1; i < length; i++){
                if (this.array[min] > this.array[i]) {
                    min = i
                }
            }
            this.swap(min, j);
        }
    }
    // 比较次数虽然和冒泡排序一样 但是N项只需要交换N-1次

    // 插入排序是简单排序中效率最好的
    ArrayList.prototype.insertionSort = function () {
        var length = this.array.length;
        // 从第一个位置获取数据，向前面局部有序进行插入
        for (var j = 1; j < length; j++){

            var temp = this.array[j];
            // 内层循环，获取i位置的元素，和前面的元素依次比较
            while (this.array[j - 1] > temp && j > 0) {
                this.array[j] = this.array[j - 1];
                j--;
            }
            this.array[j] = temp;
        }
    }
    // 效率 最多比较次数 N（N-1）/2
    // 平均 N（N-1）/4
    // 相对于选择排序和其他排序 比较次数少一半
    // 复制次数（移动次数）最多N（N-1）/2 平均N（N-1）/4


    // 希尔排序
    // 插入排序的改进版 
    ArrayList.prototype.shellSort = function () {
        var length = this.array.length;
        // 初始化增量
        var gap = Math.floor(length / 2);
        // 初始化gap增量
        while (gap >= 1) {
            // while外循环 gap不断减小
            for (var i = gap; i < length; i++) {
                var temp = this.array[i];
                var j = i;
                while (this.array[j - gap] > temp && j > gap - 1) {
                    this.array[j] = this.array[j - gap];
                    j -= gap;
                }
                // 以gap作为间隔进行分组，对分组进行插入排序
                this.array[j] = temp;
            }
                // 将J位置元赋值temp
                gap = Math.floor(gap / 2); 
        }
    }

    // 快速排序
}
var list = new ArrayList();

list.insert(32);
list.insert(4);
list.insert(231);
list.insert(42);
list.insert(2);
list.insert(6);
console.log(list);
// list.bubbleSort();
// list.selectionSort();
// list.insertionSort();
list.shellSort();
console.log(list.toString());