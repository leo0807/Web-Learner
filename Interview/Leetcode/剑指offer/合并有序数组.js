function merge(A, m, B, n) {
    // write code here
    while (m && n) {
        if (A[m - 1] >= B[n - 1]) {
            A[m + n - 1] = A[m - 1];
            m--;
        } else {
            A[m + n - 1] = B[n - 1];
            n--;
        }
    }
    while (n) {
        A[m + n - 1] = B[--n];
    }
    return A;
}