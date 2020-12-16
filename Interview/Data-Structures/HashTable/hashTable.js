// 封装哈希表
function HashTable() {
    // 属性
    this.storage = [];
    this.count = 0; //已经存放元素数
    // Load Factor =>(0.25, 0.75) 哈希表当前数据量和长度的比值
    this.limit = 7; //表总长度

    // 方法
    HashTable.prototype.hashFunc = function(str, size){
        // 定义hash code 变量
        var hashCode = 0;
        // 霍纳法则
        // charCodeAt => Unicode编码
        for (var i = 0; i < str.length; i++){
            hashCode = 37 * hashCode + str.charCodeAt(i);
        }
        // 取余操作
        var index = hashCode % index;
        return index;
    }

    //插入&修改
    HashTable.prototype.put = function (key, value) {
        // 1 根据key获取索引值
        // 目的 将数据插入到对应的位置
        var index = this.hashFunc(key, this.limit);
        // 2 根据索引值取出bucket 如果桶不存在，创建桶并且放置在该索引的位置

        var bucket = this.storage[index];
        // 判断该bucket是否为null
        if (bucket == null) {
            bucket = [];
            this.storage[index] = bucket
        }
        
        // 3 判断是修改还是新增 有值则修改，无值则添加
        for (var i = 0; i < bucket.length; i++){
            var tuple = bucket[i];
            if (tuple[0] == key) {
                tuple[1] = value;
                return
            }
        }
        // 4 添加
        bucket.push([key, value]);
        this.count++;
        // 判断是否需要扩容
        if (this.count > this.limit * 0.75) {
            var newSize = this.limit * 2;
            var newPrime = this.getPrime(newSize);
            this.resize(newPrime);
        }
    }
    // 获取
    HashTable.prototype.get = function (key) {
        // 使用hashfunc根据key获取index
        // 根据index获取bucket
        // 判断 是null则返回
        // 不为空 则线性搜索bucket
        var index = this.hashFunc(key, this.limit);
        var bucket = this.storage[index];
        if (bucket == null) {
            return null;
        }

        for (var i = 0; i < bucket.length; i++){
            var tuple = bucket[i];
            if (tuple[0] == key) {
                return tuple[1];
            }
        }
        return null;
    }
    // 删除
    HashTable.prototype.remove = function (key) {
        // 类似于获取操作
        var index = this.hashFunc(key, this.limit);
        var bucket = this.storage[index];
        if (bucket == null) {
            return null;
        }

        for (var i = 0; i < bucket.length; i++){
            var tuple = bucket[i];
            if (tuple[0] == key) {
                bucket.splice(i, 1);
                this.count--;

                // 减小容量
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    var newSize = Math.floor(this.limit / 2);
                    var newPrime = this.getPrime(newSize);
                    this.resize(newPrime);
                }
                return tuple[1];
            }
        }
        return null;
    }
    // 判断为空
    HashTable.prototype.isEmpty = function () {
        return this.count == 0;
    }
    // 元素个数
    HashTable.prototype.counts = function () {
        return this.count;
    }

    // 扩容
    // 因为bucket可以无限长，所以loadfactor 可以大于1
    // 但是如果bucket过长，则导致hashtable效率变低
    // 此时需要扩容

    // 比较常见的是LoadFactor > 0.75时候需要扩容
    // 扩容后所有数据项一定要同时修改所有数据项 （HasHFunc）

    HashTable.prototype.isPrime = function (num) {
        var temp = parseInt(Math.sqrt(num))
        for (var i = 2; i < temp; i++){
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
    // 
    HashTable.prototype.getPrime = function (num) { 
        while (!this.isPrime(num)) {
            num++;
        }
        return num;
    }

    HashTable.prototype.resize = function (newLimit) {
        // 1 保存旧的数组内容
        var oldStorage = this.storage;
        // 2 重置所有属性
        this.storage = [];
        this.count = 0;
        this.limit = newLimit;

        // 3 遍历所有oldStorage中的所有bucket
        for (var i = 0; i < oldStorage.length; i++) {
            // 3.1 取出对应的bucket
            var bucket = oldStorage[i];
            // 3.2 判断bucket是否为null
            if(bucket == null) continue
            // 3.3 bucket中有数据，那么取出数据重新插入
            for (var j = 0; j < bucket.length; j++){
                var tuple = bucket[j];
                this.put(tuple[0], tuple[1]); 
            }
        }
    }
}