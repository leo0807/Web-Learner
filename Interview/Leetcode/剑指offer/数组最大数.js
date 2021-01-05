function solve(nums) {
    // write code here
    if (nums.every(item => item === 0)) return nums[0].toString();
    nums.sort(function (a, b) {
        let tmp1 = (a + "" + b),
            tmp2 = (b + "" + a);
        if (parseInt(tmp1) < parseInt(tmp2)) {
            return 1;
        } else {
            return -1;
        }
    });
    return nums.join("");
}