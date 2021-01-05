function minNumberdisappered(arr) {
    // write code here
    let num = 0;
    //     for(let i = 0, len = arr.length; i < len; i++){
    for (let i of arr) {
        if (i > 0) num ^= i;
    }
    for (let i = 1; i <= arr.length; i++) {
        num ^= i;
    }
    return num === 0 ? arr.length + 1 : num;
}
function minNumberdisappered2(arr) {
    // write code here
    let map = new Map();
    for (let i of arr) {
        map.set(i, 1);
    }
    for (let i = 1; i <= 1000000; i++) {
        if (map.has(i)) continue;
        else return i;
    }
    return 1;
}