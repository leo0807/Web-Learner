function count(str) {
    let counter = {};
    const len = str.length;
    for (let i = 0; i < len; i++) {
        let char = str.charAt(i);
        counter[char] = counter[char] || 0;
        counter[char]++;
    }
    let maxChar,
        maxCount = 0;
    for (let i in counter) {
        if (counter[i] > maxCount) {
            maxChar = i;
            maxCount = counter[i];
        }
    }
    return [maxChar, maxCount];
}
let str = "can you know!";
console.log(count(str));