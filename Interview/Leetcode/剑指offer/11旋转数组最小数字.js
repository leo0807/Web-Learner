function minNumberInRotateArray(rotateArray) {
    // write code here
    let left = 0,
        right = rotateArray.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (rotateArray[left] < rotateArray[right]) {
            return rotateArray[left];
        }
        if (rotateArray[mid] > rotateArray[right]) {
            left = mid + 1;
        } else if (rotateArray[mid] < rotateArray[right]) {
            right = mid;
        } else {
            right--;
        }
    }
    return rotateArray[left];
}

// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
// 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
// NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。   
// [3, 4, 5, 1, 2]
// 1