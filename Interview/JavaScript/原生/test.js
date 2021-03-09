function getTimes(array, k) {
    // write code here
    let set = new Set(array);
    let arr = Array.from(set).sort((a, b,) => b - a);
    console.log(arr);
    return arr[k - 1];
}
// let arr = [1, 2, 3, 4, 4, 4], k = 1;
// console.log(getTimes(arr, k))

function includes(s1, s2) {
    // write code here
    let count = s2.length,
        len = s1.length,
        norCount = 0,
        revCount = 0;
    let tmp = s2.split('').reverse();
    for (let i = 0; i < len; i++) {
        if (s1[i] === s2[norCount]) {
            norCount++;
        }
        if (s1[i] === s2[revCount]) {
            revCount++;
        }
        if (norCount === count || revCount === count) {
            return true;
        } else {
            return false;
        }
    }


}

let s1 = "", s2 = "aah";
console.log(includes(s1, s2));