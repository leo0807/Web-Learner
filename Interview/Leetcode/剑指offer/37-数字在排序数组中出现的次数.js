// 统计一个数字在升序数组中出现的次数。
// [1, 2, 3, 3, 3, 3, 4, 5], 3
// 4


function GetNumberOfK(data, k) {
    // write code here
    let left = 0,
        right = data.length,
        lbound, rbound;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (data[mid] < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    lbound = left;
    left = 0, right = data.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (data[mid] <= k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    rbound = left;

    return rbound - lbound;
}

function GetNumberOfK1(data, k) {
    // write code here
    let left = 0,
        right = data.length,
        index, res = 0;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (data[mid] === k) {
            index = mid;
            break;
        } else if (data[mid] < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    if (index == null) {
        return -1;
    }
    for (let i = index - 1; i >= 0 && data[i] == k; i--) {
        res++;
    }
    for (let i = index, len = data.length; i < len && data[i] == k; i++) {
        res++;
    }
    return res;
}

console.log(GetNumberOfK1([1, 2, 3, 3, 3, 3, 4, 5], 3));