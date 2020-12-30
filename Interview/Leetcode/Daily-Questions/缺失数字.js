function solve(a) {
    // write code here
    let res = 0;
    for (let i = 0, len = a.length; i < len; i++) {
        if (a[i] != i) return i;
    }
}

function solve1(a) {
    // write code here
    let left = 0,
        right = a.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (a[mid] == mid) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}