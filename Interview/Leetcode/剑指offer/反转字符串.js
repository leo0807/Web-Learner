function solve(str) {
    // write code here
    const length = str.length;
    const len = Math.floor(length / 2);
    let tail, head;
    str = str.split('');
    // console.log(str)
    for (let i = 0; i < len; i++) {

        [str[i], str[length - i - 1]] = [str[length - i - 1], str[i]]
    }
    return str.join('');
}

console.log(solve("123456789"));