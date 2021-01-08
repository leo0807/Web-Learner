function FirstNotRepeatingChar(str) {
    // write code here
    for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) == str.lastIndexOf(str[i])) {
            return str.indexOf(str[i])
        }
    }
    return -1;
}