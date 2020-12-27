function sqrt(x) {
    // write code here 
    for (let i = 0; i <= x; i++) {
        if (i * i <= x && (i + 1) * (i + 1) > x) {
            return i;
        }
    }
}