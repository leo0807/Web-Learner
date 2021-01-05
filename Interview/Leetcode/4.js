function findMedianinTwoSortedAray(arr1, arr2) {
    // write code here
    let i = 0,
        j = 0,
        res = 0,
        len = arr1.length;
    while (i + j < len) {
        if (arr1[i] < arr2[j]) {
            res = arr1[i++];
        } else {
            res = arr2[j++];
        }
    }
    return res;
}