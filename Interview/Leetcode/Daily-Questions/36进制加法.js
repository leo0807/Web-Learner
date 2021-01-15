function addFunc(num1, num2) {
    let add = 0,
        temp1, temp2, res = [], sum = 0;
    num1 = num1.split(''),
        num2 = num2.split('');
    let i = num1.length - 1,
        j = num2.length - 1,
        str = '0123456789abcdefghijklmnopqrstuvwxyz';
    while (i >= 0 && j >= 0) {
        temp1 = str.indexOf(num1[i]);
        temp2 = str.indexOf(num2[j]);
        sum = temp1 + temp2 + add;
        if (sum > 35) {
            sum %= 36;
            add = 1;
        } else {
            add = 0;
        }
        res.push(str[sum]);
        i--;
        j--;
    }
    while (i >= 0) {
        sum = str.indexOf(num1[i]) + add;
        if (sum > 35) {
            sum %= 36;
            add = 1;
        } else {
            add = 0;
        }
        res.push(str[sum]);
        i--;
    }
    while (j >= 0) {
        sum = str.indexOf(num2[j]) + add;
        if (sum > 35) {
            sum %= 36;
            add = 1;
        } else {
            add = 0;
        }
        res.push(str[sum]);
        j--;
    }
    add && res.push('1');
    return res.reverse().join('');
}

const res = addFunc('1b', '2x');
console.log(res);