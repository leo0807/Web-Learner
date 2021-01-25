function quickSort(arr, low, high) {
    // console.log(arr);
    if (low < high) {
        let index = getIndex(arr, low, high);
        quickSort(arr, low, index - 1);
        quickSort(arr, index + 1, high);
    }
}

function getIndex(arr, low, high) {
    let tmp = arr[low];
    while (low < high) {
        while (low < high && arr[high] >= tmp) {
            high--;
        }
        arr[low] = arr[high];
        while (low < high && arr[low] <= tmp) {
            low++;
        }
        arr[high] = arr[low];
    }
    arr[low] = tmp;
    return low;
}

let tmp1 = [32, 4, 231, 42, 2, 6, 6, 7, 11];
quickSort(tmp1, 0, 8)
console.log(tmp1);