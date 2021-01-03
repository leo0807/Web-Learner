function compare(version1, version2) {
    // write code here
    let i = 0,
        j = 0,
        num1 = 0,
        num2 = 0,
        len1 = version1.length,
        len2 = version2.length;
    while (i < len1 || j < len2) {
        while (i < len1 && version1[i] != '.') {
            num1 = num1 * 10 + Number(version1[i]);
            i++;
        }
        while (j < len2 && version2[j] != '.') {
            num2 = num2 * 10 + Number(version2[j]);
            j++;
        }
        console.log(num1, num2)
        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
        num1 = 0,
            num2 = 0;
        i++;
        j++;
    }
    return 0;
}