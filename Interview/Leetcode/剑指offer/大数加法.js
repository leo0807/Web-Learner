function solve(s, t) {
    // write code here
    const len = Math.max(s.length, t.length);
    let add = 0;
    let res = [];
    t = t.padStart(len, '0');
    s = s.padStart(len, '0');
    for (let i = len - 1; i >= 0; i--) {
        let temp = parseInt(s.charAt(i)) + parseInt(t.charAt(i)) + add;
        if (temp >= 10) {
            temp %= 10;
            add = 1
        } else {
            add = 0;
        }
        res.push(temp);
    }
    const res1 = res.reverse().join("")
    return add === 1 ? "1" + res1 : res1;
}
// let s = "733064366",
let s = "0",
    t = "459309139";

console.log(solve(s, t));