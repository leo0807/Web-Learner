// 基数排序
function radixSort(arr, base = 10) {
    // Create bucket
    let bucket = new Array();
    for (let i = 0; i < base; i++){
        bucket[i] = [];
    }
    const len = arr.length;
    let maxDigits = 0,
        dev = 1,
        mod = 10;
    for(let i of arr){
        const length = i.toString().length;
        maxDigits = maxDigits > length ? maxDigits: length;
    }
    for(let i = 0; i < maxDigits; i++, dev *= 10, mod *= 10){
        for (let j = 0; j < len; j++){
            // Extract the number
            const bucketNum = parseInt((arr[j] % mod) / dev);
            bucket[bucketNum].push(arr[j]);
        }
        // Loop all the buckets
        let index = 0;
        for (let m = 0; m < base; m++){
            if (bucket[m] === []) continue;
            else {
                // replace old array with a new
                let val = null;
                while ((val = bucket[m].shift()) != null) {
                    arr[index++] = val;
                }
            }
        }
    }
    console.log(arr);
    return arr;
}
let tmp = [32,4,231,42,2,6,6,7,11];
radixSort(tmp);




// // 基数排序
// function radixSort(arr, base = 10) {
//     // Create bucket
//     let bucket = new Array();
//     for (let i = 0; i < base; i++){
//         bucket[i] = [];
//     }
//     const len = arr.length;
//     let maxDigits = 0,
//         dev = 1,
//         mod = 10;
//     for(let i of arr){
//         const length = i.toString().length;
//         maxDigits = maxDigits > length ? maxDigits: length;
//     }
//     for(let i = 0; i < maxDigits; i++, dev *= 10, mod *= 10){
//         for (let j = 0; j < len; j++){
//             // Extract the number
//             const bucketNum = parseInt((arr[j] % mod) / dev);
//             console.log(bucketNum);
//             bucket[bucketNum].push(arr[j]);
//         }
//         console.log(bucket);
//         // return
//         // Loop all the buckets
//         let index = 0;
//         for (let m = 0; m < base; m++){
//             if (bucket[m] === null  ) continue;
//             else {
//                 // replace old array with a new order
//                 let val = null;
//                 while ((val = bucket[m].shift()) != null) {
//                     arr[index++] = val;
//                 }
//             }
//         }
//     }
//     console.log(arr);
//     return arr;
// }
// let tmp = [32,4,231,42,2,6,6,7,11];
// radixSort(tmp);