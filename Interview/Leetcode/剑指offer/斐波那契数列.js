function Fibonacci(n) {
    // write code here
    if (n === 0) return 0;
    if (n === 1) return 1;
    let a = 0,
        b = 1,
        c;
    while (n - 1 > 0) {
        c = a + b;
        a = b;
        b = c;
        n--;
    }
    return c;
}