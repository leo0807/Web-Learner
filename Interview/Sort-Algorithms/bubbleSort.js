function bubbleSort(arr) {
    const len = arr.length;

    for (let i = len - 1; i >= 0; i--) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}
function swap(arr, i, j) {
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}


let tmp = [32, 4, 231, 42, 2, 6, 6, 7, 11];
bubbleSort(tmp);
console.log(tmp);