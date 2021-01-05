function InversePairs(data) {
    let len = data.length;
    if (len < 2) return 0;
    let temp = new Array(len);
    let res = reversePairs(data, 0, len - 1, temp);
    return res % 1000000007;
}
function reversePairs(arr, left, right, temp) {
    //     递归终止条件
    if (left === right) return 0;
    let mid = (left + right) >> 1;
    let leftPairs = reversePairs(arr, left, mid, temp),
        rightPairs = reversePairs(arr, mid + 1, right, temp),
        //         跨越两个子区间的逆序对函数
        crossPairs = mergeAndCount(arr, left, mid, right, temp);

    return leftPairs + crossPairs + rightPairs;
}
function mergeAndCount(arr, left, mid, right, temp) {
    for (let i = left; i <= right; i++) {
        temp[i] = arr[i];
    }
    let i = left,
        j = mid + 1,
        count = 0;

    for (let k = left; k <= right; k++) {
        //         超出边界的情况
        //         无法统计逆序对，需要被设置为前置条件
        if (i > mid) {
            arr[k] = temp[j];
            j++;
        } else if (j === right + 1) {
            arr[k] = temp[i];
            i++;
        } else if (temp[i] <= temp[j]) {
            arr[k] = temp[i];
            i++;
            //             此时产生逆序对
        } else {
            //             统计逆序对个数
            arr[k] = temp[j];
            j++;
            count += (mid - i + 1);
        }
    }
    return count;
}
// function InversePairs(data)
// {
//     // write code here
//     let res = 0,
//         len = data.length;
//     for(let i = 0; i < len; i++){
//         for(let j = i + 1; j < len; j++){
//             if(data[i] > data[j]){
//                 res += 1;
//             }
//         }
//     }
//     return res % 1000000007;
// }