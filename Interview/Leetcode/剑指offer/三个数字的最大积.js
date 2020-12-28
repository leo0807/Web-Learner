function solve(A) {
    // write code here
    const len = A.length;
    A.sort((a, b) => {
        return a - b;
    })
    const A1 = A[0] * A[1] * A[len - 1];
    const A2 = A[len - 1] * A[len - 2] * A[len - 3];
    return Math.max(A1, A2);
}