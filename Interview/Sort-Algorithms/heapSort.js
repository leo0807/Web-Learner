


function swap(arr, i, j){
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

function heapify(arr, n, i){
    if( i >= n) return;
    let left = 2 * i + 1,
        right = 2 * i + 2,
        max = i;
    if(i < n && arr[left] > arr[max]){
        max = left;
    }
    if(i < n && arr[right] > arr[max]){
        max = right;
    }
    if(i !== max){
        swap(arr, max, i);
        heapify(arr, n, max);
    }
}

function buildHeap(arr){
    const n = arr.length;
    // 取最后一个节点
    const lastNode = n ;
    const parentNode = Math.floor(lastNode  / 2);
    // 从最后一个节点的父节点开始做headpify
    for(let i = parentNode; i >= 0; i--){
        heapify(arr,n, i);
    }
}

function heapSort(arr){
    console.log(arr);
    buildHeap(arr);
    console.log(arr);
    const len = arr.length;
    for(let i = len - 1; i >= 0; i--){
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
    console.log(arr);
    return arr;
}

let tmp = [32,4,231,42,2,6,7,11];
heapSort(tmp);