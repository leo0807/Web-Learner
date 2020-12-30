function maxWater(arr) {
    // write code here
    if (arr === null || arr.length < 3) return 0;
    let left = 0, right = arr.length - 1,
        mark = Math.min(arr[left], arr[right]),
        res = 0;
    //     接雨水
    while (left < right) {
        if (arr[left] < arr[right]) {
            left++;
            if (arr[left] < mark) {
                res += mark - arr[left];
            } else {
                mark = Math.min(arr[left], arr[right]);
            }
        } else {
            right--;
            if (arr[right] < mark) {
                res += mark - arr[right];
            } else {
                mark = Math.min(arr[left], arr[right]);
            }
        }
    }
    return res;
}