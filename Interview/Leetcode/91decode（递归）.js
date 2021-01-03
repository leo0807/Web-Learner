var numDecodings = function (s) {
    if (s === "0" || !s.length) return 0;
    return decode(s, s.length - 1);
};

function decode(s, index) {
    if (index <= 0) return 1;

    let count = 0,
        curr = s[index],
        prev = s[index - 1];

    if (curr > '0') {
        count = decode(s, index - 1);
    }

    if (prev === '1' || (prev == '2' && curr <= '6')) {
        count += decode(s, index - 2);
    }
    return count;
}