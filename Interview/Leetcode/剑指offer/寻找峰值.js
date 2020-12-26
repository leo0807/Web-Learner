function solve(a) {
    // write code here0
    for (let i = a.length - 1; i >= 0; i--) {
        if (i == a.length - 1) {
            if (a[i - 1] <= a[i]) {
                return i;
            }
        }
        else if (i === 0) {
            if (a[i + 1] <= a[i]) {
                return 0;
            }
        }
        else if (a[i] >= a[i + 1] && a[i] >= a[i - 1]) {
            return i;
        }
    }
    return -1
}