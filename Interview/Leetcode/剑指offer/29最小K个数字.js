function GetLeastNumbers_Solution(input, k) {
    // write code here
    if (k < 0 || input.length === 0) return [];
    if (k === input.length) return input.sort((a, b) => { return a - b; });
    return patrition(input, 0, input.length - 1, k);
}
function quickSort(arr, left, right) {
    if (left >= right) return;
    let start = left,
        end = right,
        pivot = arr[left];
    while (start < end) {
        while (start < end && arr[end] >= pivot) end--;
        arr[start] = arr[end];
        while (start < end && arr[start] <= pivot) start++;
        arr[end] = arr[start];
    }
    arr[start] = pivot;
    return start;
}
function patrition(arr, left, right, k) {
    while (left < right) {
        let patrition = quickSort(arr, left, right);
        if (patrition + 1 === k) return arr.slice(0, k).sort((a, b) => { return a - b; });
        if (patrition + 1 < k) left = patrition + 1;
        else right = patrition;
    }
    return -1;
}
module.exports = {
    GetLeastNumbers_Solution: GetLeastNumbers_Solution
};