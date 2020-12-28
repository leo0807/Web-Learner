function FindNumsAppearOnce(array) {
    // write code here
    const len = array.length;
    if (len <= 2) return array;
    let res = new Set();
    for (let i = 0; i < len; i++) {
        if (res.has(array[i])) {
            res.delete(array[i]);
        } else {
            res.add(array[i]);
        }
    }
    return [...res];
}