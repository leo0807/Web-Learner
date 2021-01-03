function maxlenEqualK(arr, k) {
    // write code here
    let res = -Infinity,
        sum = 0,
        map = new Map(),
        len = arr.length;
    map.set(0, -1);
    for (let i = 0; i < len; i++) {
        sum += arr[i];
        let num = sum - k;
        //         S(j) - S(i) = k;
        //         S(j) - k = S(i);
        if (map.has(num)) {
            res = Math.max(res, i - map.get(num));
        }
        //         S(i)
        if (!map.has(sum)) {
            map.set(sum, i);
        }
    }
    return res;
}
// 根据arr[j + 1…i]=s(i) - s(j), 所以，如果从0开始遍历，会导致j + 1 >= 1, 这样就会把以arr[0]开始的子数组漏掉了，所以应该从 - 1位置开始累加，也就是开始遍历时把(0, -1)加入map，表示如果任何一个数都不加时，累加和为0。
// 比如数组[1, 2, 3, 3], k = 6, 如果不加（0，-1）：
// ①sum = 1，index = 0，加入map，map = [(1, 0)];
// ②sum = 3，index = 1，加入map，map = [(1, 0), (3, 1)];
// ③sum = 6，index = 2，加入map，map = [(1, 0), (3, 1), (6, 2)];
// ④sum = 9，index = 3，此时map包含sum - k，即3，所以此时len的长度更新为2，即子数组为[3, 3]。很显然子数组[1, 2, 3]才是最长的。所以不加（0，-1）会出现这种情况。
// 如果加了(0, -1):
// ①sum = 1，index = 0，加入map, map = [(0, -1), (1, 0)];
// ②sum = 3，index = 1，加入map，map = [(0, -1), (1, 0), (3, 1)];
// ③sum = 6，index = 2，此时map包含sum - k，即0，此时len的长度为3，即[1, 2, 3];
// ④sum = 9，index = 3，此时map包含sum - k，即3，所以此时子数组为[3, 3], 长度是2，所以len = 3；显然符合要求。