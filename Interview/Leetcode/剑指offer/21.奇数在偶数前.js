function reOrderArray(array) {
    // write code here
    const len = array.length;
    for (let j = 0; j < len - 1; j++) {
        for (let i = len - 2; i >= 0; i--) {
            if (array[i] % 2 === 0) {
                swap(array, i, i + 1);
            }
        }
    }
    return array;
}


function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(reOrderArray(arr));